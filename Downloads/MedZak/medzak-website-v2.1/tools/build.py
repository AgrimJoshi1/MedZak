#!/usr/bin/env python3
"""Fill the shared parts of every page from one source of truth.

    python tools/build.py          # rewrite the pages
    python tools/build.py --check  # exit 1 if any page is out of date

Pages mark shared regions with comment pairs, e.g.

    <!-- @header --> ... <!-- /@header -->

and the region is replaced by tools/partials/<name>.html (or .svg). In a partial,
{{nav}} becomes the header menu rendered from tools/nav-data.json with the page's
own tab marked current. Pages without an @header region (not yet migrated) only
get their <ul class="navigation"> refreshed.
"""
import html
import json
import re
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
TOOLS = Path(__file__).resolve().parent
PARTIALS = TOOLS / 'partials'
REGION_RE = re.compile(r'<!-- @(?P<name>[\w-]+) -->.*?<!-- /@(?P=name) -->', re.S)
NAV_RE = re.compile(r'<ul class="navigation">.*?</ul>(?=\s*</nav>)', re.S)

SVG = ('<svg{cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="{w}" '
       'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{body}</svg>')
CARET = '<path d="M6 9l6 6 6-6"/>'
ARROW = '<path d="M5 12h14M12 5l7 7-7 7"/>'
CHECK = '<polyline points="20 6 9 17 4 12"/>'


def esc(text):
    return html.escape(text, quote=True)


def svg(body, width='2', cls=''):
    return SVG.format(cls=f' class="{cls}"' if cls else '', w=width, body=body)


def link_attrs(link):
    attrs = f'href="{esc(link["href"])}"'
    if link.get('modal'):
        attrs += f' data-modal="{esc(link["modal"])}"'
    return attrs


# ---------- header menu (one template for every tab) ----------
def render_item(item, icons):
    if 'thumb' in item:  # gallery items show their photo in the chip; the name carries the meaning
        chip = f'<img src="{esc(item["thumb"])}" alt="" width="36" height="36" loading="lazy" decoding="async">'
    else:
        chip = svg(icons[item['icon']])
    detail = f'<span class="dd-info">{esc(item["detail"])}</span>' if item.get('detail') else ''
    return ('<li role="none">'
            f'<a {link_attrs(item)} class="dd-item" role="menuitem">'
            f'<span class="dd-icon">{chip}</span>'
            f'<span class="dd-text"><span class="dd-name">{esc(item["label"])}</span>'
            f'<span class="dd-desc">{esc(item["description"])}</span>{detail}</span>'
            f'{svg(ARROW, "2.2", "dd-arrow")}</a></li>')


def render_tab(tab, icons, current):
    panel_id = f'dd-{tab["id"]}'
    items = ''.join(render_item(item, icons) for item in tab['items'])
    foot = tab['footer']
    cur_class, cur_attr = (' current', ' aria-current="page"') if current else ('', '')
    return (f'<li class="has-dropdown{cur_class}">'
            f'<a href="{esc(tab["href"])}" class="dropdown-trigger" aria-haspopup="menu" aria-expanded="false" '
            f'aria-controls="{panel_id}"{cur_attr}>'
            f'{esc(tab["label"])}{svg(CARET, "2.5", "nav-caret")}</a>'
            f'<div class="dd-panel" id="{panel_id}">'
            f'<div class="dd-head"><span class="dd-title">{esc(tab["title"])}</span>'
            f'<a {link_attrs(tab["viewAll"])} class="dd-viewall">{esc(tab["viewAll"]["label"])} &rarr;</a></div>'
            f'<ul class="dd-list" role="menu" aria-label="{esc(tab["label"])}">{items}</ul>'
            f'<div class="dd-foot"><span class="dd-note">{svg(CHECK, "2.5")}<span>{esc(foot["note"])}</span></span>'
            f'<a {link_attrs(foot["cta"])} class="btn btn--primary btn--sm theme-btn btn-style-one dd-btn">'
            f'<span class="btn-title">{esc(foot["cta"]["label"])}</span></a></div>'
            '</div></li>')


def render_nav(data, page_name):
    # buttons carry both class sets while legacy pages (css/legacy.css) still exist
    tabs = ''.join(render_tab(tab, data['icons'], page_name in tab['pages']) for tab in data['tabs'])
    demo = data['menuDemo']
    return (f'<ul class="navigation">{tabs}'
            f'<li class="menu-demo"><a {link_attrs(demo)} class="btn btn--primary btn--block theme-btn btn-style-one">'
            f'<span class="btn-title">{esc(demo["label"])}</span></a></li></ul>')


# ---------- command-palette search index (built from the same nav data) ----------
def render_search_index(data):
    """JSON for the Ctrl/Cmd+K palette: every tab, every dropdown item and the two global actions."""
    entries, seen = [], set()

    def add(title, desc, href=None, group='Page', modal=None, action=None):
        key = (title, href or modal or action)
        if key in seen:
            return
        seen.add(key)
        entry = {'t': title, 'd': desc, 'g': group}
        if href:
            entry['h'] = href
        if modal:
            entry['m'] = modal
        if action:
            entry['a'] = action
        entries.append(entry)

    for tab in data['tabs']:
        add(tab['label'], tab['title'], tab['href'])
        for item in tab['items']:
            add(item['label'], item['description'], item['href'], tab['label'])
    add('Book a Demo', 'See the technology first-hand', modal='bookDemo', group='Action')
    add('Request a Call Back', 'Leave your details and we will get in touch', modal='callback', group='Action')
    add('Switch light / dark theme', 'Change the colour theme', action='theme', group='Action')
    return json.dumps(entries, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')


# ---------- partial regions ----------
def load_partial(name):
    for ext in ('.html', '.svg'):
        path = PARTIALS / (name + ext)
        if path.exists():
            return path.read_bytes().decode('utf-8').strip('\n')
    raise SystemExit(f'no partial named {name!r} in {PARTIALS}')


def build_page(src, page_name, data):
    def fill(m):
        name = m.group('name')
        body = load_partial(name).replace('{{nav}}', render_nav(data, page_name))
        body = body.replace('{{search-index}}', render_search_index(data))
        return f'<!-- @{name} -->\n{body}\n<!-- /@{name} -->'
    out = REGION_RE.sub(fill, src)
    if '<!-- @header -->' not in out:  # legacy page: refresh only its menu
        out = NAV_RE.sub(lambda _: render_nav(data, page_name), out, count=1)
    return out


def main(argv):
    check = '--check' in argv
    data = json.loads((TOOLS / 'nav-data.json').read_text(encoding='utf-8'))
    stale = []
    for page in sorted(SITE.glob('*.html')):
        src = page.read_bytes().decode('utf-8')  # bytes in/out: keep the file's line endings untouched
        if not REGION_RE.search(src) and not NAV_RE.search(src):
            continue  # redirect stubs
        out = build_page(src, page.name, data)
        if out != src:
            stale.append(page.name)
            if not check:
                page.write_bytes(out.encode('utf-8'))
    if check:
        print('out of date: ' + ', '.join(stale) if stale else 'all pages up to date')
        return 1 if stale else 0
    print('updated: ' + ', '.join(stale) if stale else 'nothing to update')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
