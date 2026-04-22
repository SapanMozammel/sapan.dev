#!/usr/bin/env bash
# Build Sapan's resume — merges content.py into resume.html template and renders PDF.
# Run from the project root: bash .claude/resume/build.sh

set -e

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
RESUME_DIR="$ROOT/.claude/resume"
IMG="$ROOT/public/images/me/sapan-headshot.jpg"
OUT_PDF="$ROOT/Sapan-Mozammel-Frontend-Developer.pdf"

echo "→ rendering template with content.py + base64 headshot..."
IMG_B64=$(base64 -i "$IMG" | tr -d '\n')

export RESUME_DIR IMG_B64
python3 <<'PY'
import os, importlib.util

RESUME_DIR = os.environ["RESUME_DIR"]

spec = importlib.util.spec_from_file_location("content", f"{RESUME_DIR}/content.py")
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)

def render_experience(entries):
    out = []
    for e in entries:
        bullets = "\n".join(f'          <li>{b}</li>' for b in e["bullets"])
        out.append(f'''      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">{e["role"]}</span>
          <span class="entry-date">{e["date"]}</span>
        </div>
        <div class="entry-sub">{e["location"]}</div>
        <ul class="entry-bullets">
{bullets}
        </ul>
      </div>''')
    return "\n\n".join(out)

def render_projects(entries):
    out = []
    for p in entries:
        out.append(f'''        <div class="project-item">
          <span class="project-name">{p["name"]}</span><span class="project-stack">{p["stack"]}</span>
          <span class="project-desc">{p["desc"]}</span>
        </div>''')
    return "\n".join(out)

def render_education(entries):
    out = []
    for e in entries:
        out.append(f'''      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">{e["title"]}</span>
          <span class="entry-date">{e["date"]}</span>
        </div>
        <div class="entry-sub">{e["sub"]}</div>
      </div>''')
    return "\n\n".join(out)

def render_skills(entries):
    return "\n".join(f'        <div>{s}</div>' for s in entries)

def render_additional(entries):
    return "\n".join(
        f'        <li><strong>{a["label"]}:</strong> {a["text"]}</li>'
        for a in entries
    )

with open(f"{RESUME_DIR}/resume.html", "r") as f:
    html = f.read()

replacements = {
    "{{NAME}}": c.NAME,
    "{{ROLE}}": c.ROLE,
    "{{EMAIL}}": c.CONTACT["email"],
    "{{WEBSITE}}": c.CONTACT["website"],
    "{{LINKEDIN}}": c.CONTACT["linkedin"],
    "{{GITHUB}}": c.CONTACT["github"],
    "{{LOCATION}}": c.CONTACT["location"],
    "{{SUMMARY}}": c.SUMMARY,
    "{{EXPERIENCE_ENTRIES}}": render_experience(c.EXPERIENCE),
    "{{PROJECT_ENTRIES}}": render_projects(c.PROJECTS),
    "{{EDUCATION_ENTRIES}}": render_education(c.EDUCATION),
    "{{SKILL_ENTRIES}}": render_skills(c.SKILLS),
    "{{ADDITIONAL_ENTRIES}}": render_additional(c.ADDITIONAL),
    "__AVATAR_PATH__": "data:image/jpeg;base64," + os.environ["IMG_B64"],
}

for token, value in replacements.items():
    html = html.replace(token, value)

with open(f"{RESUME_DIR}/resume-built.html", "w") as f:
    f.write(html)
PY

echo "→ rendering PDF via Chrome headless..."
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT_PDF" \
  --print-to-pdf-no-header \
  "file://$RESUME_DIR/resume-built.html" >/dev/null 2>&1

echo ""
echo "✓ Done."
ls -lh "$OUT_PDF"
