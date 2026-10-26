#!/usr/bin/env python3
"""Content inventory: proves a redesign keeps every piece of content.

    python tools/content_inventory.py --write   # snapshot the pages -> docs/content-baseline.json
                                                #   and regenerate docs/content-inventory.md
    python tools/content_inventory.py --check   # compare the pages with the snapshot; exit 1 if
                                                #   any text, image, link, form field, iframe or
                                                #   linked anchor has disappeared

Markup may change freely: every baseline text block only has to appear somewhere in
the same page's text (whitespace-normalised), so restructured or restyled sections pass
as long as the copy itself is kept verbatim.
"""
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
DOCS = SITE / 'docs'
BASELINE = DOCS / 'content-baseline.json'
INVENTORY = DOCS / 'content-inventory.md'
PAGES = ['index.html', 'about-us.html', 'our-products.html', 'achievements.html', 'gallery-media.html',
         'careers.html', 'contact.html', 'our-team.html', 'why-us.html', 'our-offerings.html']

INLINE = {'a', 'span', 'strong', 'em', 'b', 'i', 'small', 'sup', 'sub', 'abbr', 'code', 'mark', 'img', 'svg',
          'path', 'circle', 'rect', 'polyline', 'line', 'polygon', 'ellipse', 'g', 'use', 'time', 'label'}
BLOCKS = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'figcaption', 'label', 'option', 'button', 'a',
          'address', 'td', 'th', 'dt', 'dd', 'blockquote', 'summary', 'legend', 'caption', 'title'}
TEXT_ATTRS = ('alt', 'aria-label', 'placeholder', 'title', 'data-caption')
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}


def norm(text):
    return re.sub(r'\s+', ' ', html.unescape(text)).strip()


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.corpus, self.blocks, self.attrs = [], [], []
        self.images, self.links, self.iframes, self.ids, self.forms = [], [], [], [], []
        self.meta, self.sections, self.ticker = {}, [], []
        self.open_blocks = []  # [tag, text buffer, contains another block?]
        self.skip = 0          # inside <script>/<style>
        self.form = None
        self.section = None
        self.ticker_buf = None

    # -- helpers -------------------------------------------------------------
    def _text(self, data):
        self.corpus.append(data)
        for ob in self.open_blocks:
            ob[1].append(data)
        if self.ticker_buf is not None:
            self.ticker_buf.append(data)

    def _boundary(self):
        self._text(' ')

    # -- parser callbacks ----------------------------------------------------
    def handle_starttag(self, tag, attrs):
        a = {k: (v or '') for k, v in attrs}
        if tag in ('script', 'style'):
            if a.get('type') != 'application/ld+json':
                self.skip += 1
            return
        if self.skip:
            return
        if tag not in INLINE:
            self._boundary()
        if tag == 'br':
            self._boundary()
        if a.get('id'):
            self.ids.append(a['id'])
        for k in TEXT_ATTRS:
            if a.get(k):
                self.attrs.append(norm(a[k]))
        if tag == 'meta' and (a.get('name') or a.get('property')):
            self.meta[a.get('name') or a.get('property')] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical':
            self.meta['canonical'] = a.get('href', '')
        if tag == 'img':
            self.images.append([a.get('src', ''), norm(a.get('alt', ''))])
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag == 'iframe':
            self.iframes.append(a.get('src', ''))
        if tag == 'form':
            self.form = {'id': a.get('id', ''), 'action': a.get('action', ''), 'method': a.get('method', 'get'), 'fields': []}
            self.forms.append(self.form)
        if tag in ('input', 'select', 'textarea') and self.form is not None and a.get('name'):
            self.form['fields'].append(a['name'] + ':' + (a.get('type') or tag) + ('*' if 'required' in a else ''))
        if tag in ('section', 'footer', 'header') or (tag == 'div' and 'modal' in a.get('class', '').split()):
            label = a.get('id') or a.get('aria-label') or a.get('class', '').split(' ')[0] or tag
            self.section = {'tag': tag, 'label': label, 'heading': None}
            self.sections.append(self.section)
        if tag in ('h1', 'h2') and self.section is not None and self.section['heading'] is None:
            self.section['heading'] = ''  # filled on end tag
            self.open_blocks.append(['__heading', [], True])
        if 'ticker-item' in a.get('class', '').split():
            self.ticker_buf = []
        if tag in BLOCKS and tag not in VOID:
            for ob in self.open_blocks:  # ancestors become containers; only leaf blocks are recorded
                ob[2] = True
            self.open_blocks.append([tag, [], False])

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)
            return
        if self.skip:
            return
        if tag not in INLINE:
            self._boundary()
        if tag == 'form':
            self.form = None
        if tag == 'div' and self.ticker_buf is not None:
            self.ticker.append(norm(''.join(self.ticker_buf)))
            self.ticker_buf = None
        for i in range(len(self.open_blocks) - 1, -1, -1):
            if self.open_blocks[i][0] == tag:
                text = norm(''.join(self.open_blocks[i][1]))
                if text and not self.open_blocks[i][2]:
                    self.blocks.append(text)
                if tag == 'title':
                    self.meta['title'] = text
                del self.open_blocks[i]
                break
        if tag in ('h1', 'h2'):
            for i in range(len(self.open_blocks) - 1, -1, -1):
                if self.open_blocks[i][0] == '__heading':
                    if self.section is not None:
                        self.section['heading'] = norm(''.join(self.open_blocks[i][1]))
                    del self.open_blocks[i]
                    break

    def handle_data(self, data):
        if not self.skip:
            self._text(data)


def scan(name):
    p = Page()
    p.feed((SITE / name).read_text(encoding='utf-8'))
    uniq = lambda xs: list(dict.fromkeys(xs))
    return {
        'title': p.meta.get('title') or '',
        'meta': {k: v for k, v in p.meta.items() if k in ('description', 'canonical', 'robots', 'og:title', 'og:description', 'og:image', 'refresh')},
        'sections': p.sections,
        'blocks': uniq(b for b in p.blocks if len(b) > 1),
        'attrs': uniq(p.attrs),
        'images': uniq(tuple(i) for i in p.images),
        'links': uniq(p.links),
        'forms': p.forms,
        'iframes': uniq(p.iframes),
        'ids': uniq(p.ids),
        'ticker': p.ticker,
        '_corpus': norm(''.join(p.corpus)),
    }


def snapshot():
    out = {}
    for name in PAGES:
        if (SITE / name).exists():
            data = scan(name)
            data.pop('_corpus')
            data['images'] = [list(i) for i in data['images']]
            out[name] = data
    return out


def check(baseline):
    problems, notes = [], []
    linked_ids = {h.split('#', 1)[1] for page in baseline.values() for h in page['links'] if '#' in h and h.split('#', 1)[1]}
    for name, old in baseline.items():
        if not (SITE / name).exists():
            problems.append(f'{name}: PAGE MISSING')
            continue
        new = scan(name)
        corpus = new['_corpus']
        for b in old['blocks']:
            if b not in corpus:
                problems.append(f'{name}: text missing: {b[:110]!r}')
        attr_pool = set(new['attrs'])
        for b in old['attrs']:
            if b not in attr_pool and b not in corpus:
                problems.append(f'{name}: alt/aria text missing: {b[:110]!r}')
        new_pairs = {tuple(i) for i in new['images']}
        new_srcs = {src for src, _ in new_pairs}
        for src, alt in old['images']:
            if src not in new_srcs:
                problems.append(f'{name}: image missing: {src}')
            elif (src, alt) not in new_pairs:
                alts = sorted(a for s, a in new_pairs if s == src)
                notes.append(f'{name}: alt changed for {src}: {alt!r} -> {alts}')
        for href in old['links']:
            if href not in new['links']:
                problems.append(f'{name}: link missing: {href}')
        for src in old['iframes']:
            if src not in new['iframes']:
                problems.append(f'{name}: iframe missing: {src[:80]}')
        new_fields = {(f['action'], fld.split(':')[0]) for f in new['forms'] for fld in f['fields']}
        for f in old['forms']:
            for fld in f['fields']:
                if (f['action'], fld.split(':')[0]) not in new_fields:
                    problems.append(f'{name}: form field missing: {f["id"] or f["action"]} -> {fld}')
        for i in old['ids']:
            if i not in new['ids']:
                (problems if i in linked_ids else notes).append(f'{name}: id missing: #{i}' + (' (linked)' if i in linked_ids else ''))
        for item in old['ticker']:
            if item not in corpus:
                problems.append(f'{name}: ticker item missing: {item}')
    return problems, notes


def markdown(base):
    nav = json.loads((SITE / 'tools' / 'nav-data.json').read_text(encoding='utf-8'))
    L = ['# Content inventory', '',
         'Snapshot of every page, section, nav item, image, form and ticker item on the Medzak site, taken before',
         'the "Calm Clinical Intelligence" redesign. It is the checklist that proves nothing was removed:',
         '`python tools/content_inventory.py --check` compares the live pages against `docs/content-baseline.json`',
         '(every text block, alt/aria text, image, link, form field, iframe and linked anchor).', '',
         'UX problems found during the audit: see [ux-audit.md](ux-audit.md).', '',
         '## Navigation (header, all pages)', '']
    for tab in nav['tabs']:
        L.append(f'- **{tab["label"]}** → `{tab["href"]}` — panel "{tab["title"]}", view-all "{tab["viewAll"]["label"]}" → `{tab["viewAll"]["href"]}`, footer "{tab["footer"]["note"]}" + CTA "{tab["footer"]["cta"]["label"]}"')
        for it in tab['items']:
            L.append(f'  - {it["label"]} → `{it["href"]}` — {it["description"]}' + (f' / {it["detail"]}' if it.get('detail') else ''))
    L += [f'- Header actions: theme toggle (light/dark), "{nav["menuDemo"]["label"]}" (opens Book-a-Demo modal), hamburger below 1200px', '']
    totals = {'pages': 0, 'images': 0, 'links': 0, 'blocks': 0}
    for name, p in base.items():
        totals['pages'] += 1
        totals['images'] += len(p['images'])
        totals['links'] += len(p['links'])
        totals['blocks'] += len(p['blocks'])
        L += [f'## {name}', '', f'- Title: {p["title"]}']
        for k, v in p['meta'].items():
            L.append(f'- `{k}`: {v}')
        L += ['', '**Sections (in order)**', '']
        for s in p['sections']:
            if s['tag'] == 'header':
                continue
            L.append(f'1. `{s["tag"]}` {s["label"]}' + (f' — "{s["heading"]}"' if s['heading'] else ''))
        if p['ticker']:
            L += ['', f'**News ticker items ({len(p["ticker"])})**', ''] + [f'1. {t}' for t in p['ticker']]
        if p['forms']:
            L += ['', '**Forms**', '']
            for f in p['forms']:
                L.append(f'- `{f["id"] or "(no id)"}` {f["method"].upper()} `{f["action"]}` — fields: ' + ', '.join(f'`{x}`' for x in f['fields']))
        if p['iframes']:
            L += ['', '**Embeds**', ''] + [f'- `{s[:90]}…`' for s in p['iframes']]
        content_imgs = [i for i in p['images'] if '/nav/' not in i[0]]
        if content_imgs:
            L += ['', f'**Images ({len(content_imgs)}, excluding nav thumbnails)**', '', '| src | alt |', '|---|---|']
            L += [f'| `{src}` | {alt or "*(empty)*"} |' for src, alt in content_imgs]
        L += ['', f'Text blocks captured: {len(p["blocks"])} · links: {len(p["links"])} · ids: {len(p["ids"])}', '']
    L.insert(8, f'Totals: {totals["pages"]} pages · {totals["blocks"]} text blocks · {totals["images"]} image references · {totals["links"]} link references.\n')
    return '\n'.join(L) + '\n'


def main(argv):
    sys.stdout.reconfigure(encoding='utf-8')  # Windows consoles default to cp1252
    if '--write' in argv:
        DOCS.mkdir(exist_ok=True)
        base = snapshot()
        BASELINE.write_text(json.dumps(base, ensure_ascii=False, indent=1), encoding='utf-8')
        INVENTORY.write_text(markdown(base), encoding='utf-8')
        print(f'wrote {BASELINE.relative_to(SITE)} and {INVENTORY.relative_to(SITE)} ({len(base)} pages)')
        return 0
    if '--check' in argv:
        problems, notes = check(json.loads(BASELINE.read_text(encoding='utf-8')))
        for n in notes:
            print('note:', n)
        for p in problems:
            print('MISSING:', p)
        print(f'{len(problems)} missing, {len(notes)} notes')
        return 1 if problems else 0
    print(__doc__)
    return 2


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
