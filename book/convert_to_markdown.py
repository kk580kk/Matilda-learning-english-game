#!/usr/bin/env python3
"""Convert matilda_full_text.txt to a clean Markdown file."""

import re

INPUT = "/Volumes/Serene 2T/Workspaces/github.com/kk580kk/Matilda-learning-english-game/book/matilda_full_text.txt"
OUTPUT = "/Volumes/Serene 2T/Workspaces/github.com/kk580kk/Matilda-learning-english-game/book/Matilda.md"

# Chapter titles (from the Table of Contents)
CHAPTER_TITLES = [
    "The Reader of Books",
    "Mr Wormwood, the Great Car Dealer",
    "The Hat and the Superglue",
    "The Ghost",
    "Arithmetic",
    "The Platinum-Blond Man",
    "Miss Honey",
    "The Trunchbull",
    "The Parents",
    "Throwing the Hammer",
    "Bruce Bogtrotter and the Cake",
    "Lavender",
    "The Weekly Test",
    "The First Miracle",
    "The Second Miracle",
    "Miss Honey's Cottage",
    "Miss Honey's Story",
    "The Names",
    "The Practice",
    "The Third Miracle",
    "A New Home",
]
CHAPTER_SET = set(CHAPTER_TITLES)

# Chapter titles that appear split across two lines in the PDF extraction.
# Key = (first_line.strip(), second_line.strip()), value = full title
SPLIT_TITLES = {
    ("Mr Wormwood,", "the Great Car Dealer"): "Mr Wormwood, the Great Car Dealer",
    ("The Hat", "and the Superglue"): "The Hat and the Superglue",
    ("Bruce Bogtrotter", "and the Cake"): "Bruce Bogtrotter and the Cake",
}

with open(INPUT, "r", encoding="utf-8") as f:
    raw = f.read()

# Split into pages
page_blocks = re.split(r"=== Page \d+ ===\n?", raw)

def fix_hyphen_breaks(text):
    """Join words broken by end-of-line hyphens."""
    return re.sub(r'(\w)-\s*\n\s*(\w)', lambda m: m.group(1) + m.group(2), text)

def clean_spaces(text):
    return re.sub(r'[ \t]{2,}', ' ', text)

# Flatten all page lines
flat_lines = []
for block in page_blocks:
    block = fix_hyphen_breaks(block)
    for line in block.splitlines():
        flat_lines.append(clean_spaces(line).rstrip())

# ─── Merge split chapter titles ──────────────────────────────────────────────
merged_lines = []
i = 0
while i < len(flat_lines):
    line = flat_lines[i]
    # Check if this line + next line form a split title
    if i + 1 < len(flat_lines):
        pair = (line.strip(), flat_lines[i+1].strip())
        if pair in SPLIT_TITLES:
            merged_lines.append(SPLIT_TITLES[pair])
            i += 2
            continue
    merged_lines.append(line)
    i += 1

flat_lines = merged_lines

# ─── Find body start (second occurrence of first chapter title) ───────────────
first_chapter = "The Reader of Books"
occurrences = [idx for idx, l in enumerate(flat_lines) if l.strip() == first_chapter]
body_start = occurrences[1] if len(occurrences) >= 2 else (occurrences[0] if occurrences else 0)

# ─── Build body paragraphs ───────────────────────────────────────────────────
body_raw = flat_lines[body_start:]

paragraphs = []
buffer = []

def flush_buffer(buf):
    if buf:
        text = " ".join(l.strip() for l in buf if l.strip())
        if text:
            paragraphs.append(text)
        buf.clear()

for line in body_raw:
    stripped = line.strip()
    if stripped in CHAPTER_SET:
        flush_buffer(buffer)
        paragraphs.append(f"## {stripped}")
    elif stripped == "":
        flush_buffer(buffer)
    else:
        buffer.append(stripped)

flush_buffer(buffer)

# ─── Render Markdown ─────────────────────────────────────────────────────────
front_matter = [
    "# MATILDA",
    "",
    "*by Roald Dahl*",
    "",
    "*Illustrated by Quentin Blake*",
    "",
    "---",
    "",
    "*For Michael and Lucy*",
    "",
    "---",
    "",
]

md_parts = front_matter[:]
for p in paragraphs:
    if p.startswith("## "):
        if md_parts and md_parts[-1] != "":
            md_parts.append("")
        md_parts.append(p)
        md_parts.append("")
    else:
        md_parts.append(p)
        md_parts.append("")

# Trim trailing blanks
while md_parts and md_parts[-1] == "":
    md_parts.pop()

markdown = "\n".join(md_parts) + "\n"

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(markdown)

chapter_count = sum(1 for p in paragraphs if p.startswith("## "))
para_count = sum(1 for p in paragraphs if not p.startswith("## "))
print(f"Written to:  {OUTPUT}")
print(f"Chapters:    {chapter_count}")
print(f"Paragraphs:  {para_count}")
print(f"Total chars: {len(markdown):,}")
