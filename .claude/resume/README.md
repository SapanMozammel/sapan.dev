# Resume build system

One-page ATS-style resume (Prime template), rendered to PDF from a Python
content file and an HTML template.

## Files

```
.claude/resume/
├── README.md       ← this file
├── build.sh        ← runs the build (do not edit unless changing pipeline)
├── content.py      ← all resume content — edit this
└── resume.html     ← template + CSS styling — edit only for design changes
```

Generated on build:

- `public/resume/Sapan-Mozammel-Frontend-Developer.pdf` — final PDF, served by the website's download button (committed). Overwritten on each build.
- `.claude/resume/resume-built.html` — intermediate HTML with headshot inlined (gitignored)

## Build

From the project root:

```bash
bash .claude/resume/build.sh
```

Requires: Python 3, Google Chrome (macOS path hardcoded in `build.sh`).

## Editing content

All content lives in `content.py`. After editing, run the build command above.

### Change header info

```python
NAME = "Your Name"
ROLE = "Your Title"
CONTACT = {
    "email": "...",
    "website": "...",
    "linkedin": "...",
    "github": "...",
    "location": "City, Country · Remote",
}
```

### Update the summary

Edit the `SUMMARY` string. Keep it 3–5 sentences. Multi-line allowed via
parenthesised string concatenation.

### Add a job

Prepend a new dict to the `EXPERIENCE` list:

```python
{
    "role": "Role, Company",
    "date": "Mon YYYY — Mon YYYY",
    "location": "City, Country · Full-time",
    "bullets": [
        "First achievement with <strong>metric</strong>.",
        "Second achievement.",
    ],
},
```

### Add a project

Append to `PROJECTS`:

```python
{
    "name": "Project Name",
    "stack": "— Tech · Stack · Used",
    "desc": "One-sentence description.",
},
```

### Update skills

`SKILLS` is a flat list. The template renders it as a 4-column grid, so
prefer a length that's a multiple of 4 for clean rows.

### Update education / additional info

Same pattern — edit `EDUCATION` and `ADDITIONAL` lists.

## Formatting rules inside content strings

| You want | Write |
|---|---|
| Bold a phrase | `<strong>phrase</strong>` |
| Literal `&` | `&amp;` |
| Em dash | `—` (actual character) |
| Bullet separator | `·` (actual character) |

All other HTML is unsafe — escape it or avoid it. The content becomes raw HTML.

## Keeping the PDF to one page

The current layout is calibrated tight for one A4 page with this content
volume. If you **add content**, expect overflow. Options in order of least
disruption:

1. **Trim text** — shorten bullets or the summary.
2. **Reduce `.section` spacing** in `resume.html` CSS (currently
   `margin-top: 3px; margin-bottom: 3px`). Smaller values squeeze more in.
3. **Shrink font sizes** — `body { font-size }`, `.entry-bullets li`,
   `.summary`. Drop by 0.5px increments.
4. **Tighten page padding** — `.container { padding }` (currently
   `9mm 11mm 7mm`). Left/right less than 8mm starts to look cramped.

Verify page count after any change:

```bash
python3 -c "
import re
with open('public/resume/Sapan-Mozammel-Frontend-Developer.pdf','rb') as f:
    print('Pages:', len(re.findall(rb'/Type\s*/Page[^s]', f.read())))
"
```

## Changing design

Everything visual lives in the `<style>` block at the top of `resume.html`.

- **Accent color**: `--accent` in `:root` (currently `#2563eb`).
- **Font**: Google Fonts import at top. Change family + update `body font-family`.
- **Section header style**: `.section h2` — border-top + border-bottom for the
  double-line look.
- **Photo**: `.avatar` (shape, size). Headshot file lives at
  `public/images/me/sapan-headshot.jpg`; change the path in `build.sh` if
  you move it.
- **Layout**: `.header` is a 2-col grid (text left, photo right). Experience,
  education entries use `.entry-head` flex (title left, date right).

## How the rendering works

`build.sh` → Python script → reads `content.py` → substitutes into
`resume.html` template tokens (`{{NAME}}`, `{{EXPERIENCE_ENTRIES}}`, etc.) →
writes `resume-built.html` with base64 headshot embedded → Chrome headless
prints it to `Sapan-Mozammel-Frontend-Developer.pdf`.

The placeholder tokens in `resume.html`:

- Scalars: `{{NAME}}`, `{{ROLE}}`, `{{EMAIL}}`, `{{WEBSITE}}`,
  `{{LINKEDIN}}`, `{{GITHUB}}`, `{{LOCATION}}`, `{{SUMMARY}}`
- Lists (block replacements): `{{EXPERIENCE_ENTRIES}}`, `{{PROJECT_ENTRIES}}`,
  `{{EDUCATION_ENTRIES}}`, `{{SKILL_ENTRIES}}`, `{{ADDITIONAL_ENTRIES}}`
- Avatar: `__AVATAR_PATH__` (replaced with base64 data URL)

If you add a new list type (say `AWARDS`), you'll need to:

1. Add the data list to `content.py`.
2. Add a render function + replacement entry in `build.sh`.
3. Add a `{{AWARD_ENTRIES}}` placeholder in the right spot in `resume.html`.
