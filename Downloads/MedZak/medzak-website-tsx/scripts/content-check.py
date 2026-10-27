"""Proves the exported site still holds everything the static site had.

Compares out/ (after `npm run build`) with the static site's content baseline
(../medzak-website-v2.1/docs/content-baseline.json): every text block, alt/aria text, image, link, form field,
iframe and ticker item. It reuses the static project's HTML scanner; only the page/URL mapping differs:
  index.html -> out/index.html, about-us.html -> out/about-us/index.html, internal links x.html <-> /x/.

    python scripts/content-check.py [out-dir]      # exit 1 if anything is missing
"""
import importlib.util
import json
import re
import sys
from pathlib import Path

sys.dont_write_bytecode = True  # importing the static project's scanner must not leave a __pycache__ in it

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT.parent / 'medzak-website-v2.1'
spec = importlib.util.spec_from_file_location('ci', STATIC / 'tools' / 'content_inventory.py')
ci = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ci)

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'out'
base = json.loads((STATIC / 'docs' / 'content-baseline.json').read_text(encoding='utf-8'))
SKIP = {'why-us.html', 'our-offerings.html'}  # redirect stubs: checked for existence below


def out_file(name):
    return OUT / 'index.html' if name == 'index.html' else OUT / name[:-5] / 'index.html'


def scan(path):
    p = ci.Page()
    raw = path.read_text(encoding='utf-8')
    p.feed(raw)
    return p, raw


def map_href(h):
    """static href -> acceptable hrefs in the exported site"""
    if h.startswith(('http', 'mailto:', 'tel:')):
        return [h]
    m = re.match(r'^([a-z0-9-]+)\.html(#.*)?$', h)
    if m:
        slug, frag = m.group(1), m.group(2) or ''
        if slug == 'index':
            return ['/' + frag, '/']
        return [f'/{slug}/{frag}', f'/{slug}/']
    if h.startswith('#'):
        return [h]
    return [h, '/' + h.lstrip('/')]


def norm_src(s):
    return s.lstrip('/')


problems, notes = [], []
stats = {'pages': 0, 'blocks': 0, 'images': 0, 'links': 0}
for name, old in base.items():
    if name in SKIP:
        continue
    f = out_file(name)
    if not f.exists():
        problems.append(f'{name}: PAGE MISSING ({f})')
        continue
    stats['pages'] += 1
    p, raw = scan(f)
    corpus = ci.norm(''.join(p.corpus))
    attrs = set(p.attrs)
    srcs = {norm_src(s) for s, _ in p.images}
    allurls = set(re.findall(r'(?:src|srcset|href)="([^"]+)"', raw))
    allurls |= {u.strip().split(' ')[0] for v in re.findall(r'srcset="([^"]+)"', raw) for u in v.split(',')}
    allurls = {norm_src(u) for u in allurls}
    links = set(p.links)
    for b in old['blocks']:
        stats['blocks'] += 1
        if b not in corpus:
            problems.append(f'{name}: text missing: {b[:120]!r}')
    for b in old['attrs']:
        if b not in attrs and b not in corpus:
            problems.append(f'{name}: alt/aria text missing: {b[:110]!r}')
    for src, alt in old['images']:
        stats['images'] += 1
        s = norm_src(src)
        if s not in srcs and s not in allurls:
            problems.append(f'{name}: image missing: {src}')
    for href in old['links']:
        stats['links'] += 1
        if not any(c in links for c in map_href(href)):
            problems.append(f'{name}: link missing: {href}  (looked for {map_href(href)})')
    for src in old['iframes']:
        if src not in p.iframes:
            problems.append(f'{name}: iframe missing: {src[:80]}')
    new_fields = {(fm['action'], fld.split(':')[0]) for fm in p.forms for fld in fm['fields']}
    for fm in old['forms']:
        for fld in fm['fields']:
            if (fm['action'], fld.split(':')[0]) not in new_fields:
                problems.append(f'{name}: form field missing: {fm["id"] or fm["action"]} -> {fld}')
    for item in old['ticker']:
        if item not in corpus:
            problems.append(f'{name}: ticker item missing: {item}')
    if old['title'] and p.meta.get('title') != old['title']:
        notes.append(f'{name}: title changed: {old["title"]!r} -> {p.meta.get("title")!r}')
    for k in ('description', 'canonical'):
        if old['meta'].get(k) and p.meta.get(k) != old['meta'][k]:
            notes.append(f'{name}: {k} changed: {old["meta"][k]!r} -> {p.meta.get(k)!r}')

for stub in ('why-us', 'our-offerings'):
    if not (OUT / stub / 'index.html').exists():
        problems.append(f'{stub}: redirect page missing')

sys.stdout.reconfigure(encoding='utf-8')
for n in notes:
    print('note:', n[:220])
for pr in problems:
    print('MISSING:', pr)
print(stats)
print(f'{len(problems)} missing, {len(notes)} notes')
sys.exit(1 if problems else 0)
