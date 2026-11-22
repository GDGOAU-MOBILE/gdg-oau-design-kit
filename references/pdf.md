# PDF

Two kinds of PDF: a deck exported to PDF, and a document (proposal, report, letter).

## Fonts first

A PDF must embed Google Sans and the mono face, or it will fall back to a different font and the layout
will shift.

1. Download Google Sans (OFL) from Google Fonts and Roboto Mono from Google Fonts.
2. Install them (macOS: double-click the files; Linux: copy to `~/.local/share/fonts` and run `fc-cache`).
   If you cannot install fonts system-wide, point LibreOffice at a profile that holds them:
   `soffice -env:UserInstallation=file:///path/to/profile --headless --convert-to pdf deck.pptx`
   with the TTF files in `/path/to/profile/user/fonts/`.
3. Check: `pdffonts out.pdf` must list GoogleSans-Regular, GoogleSans-Bold and the mono face.

Variable font files may need static instances for LibreOffice. Use `fontTools.varLib.instancer` to cut
Regular (wght 400) and Bold (wght 700) and name the family "Google Sans".

## Deck to PDF

Export the PPTX with LibreOffice as above, or from PowerPoint/Keynote with "embed fonts" on. Check page
count and every page as images before sending.

## Documents (A4 proposals, reports)

- A4 portrait, 20 mm margins.
- Header: GDG mark and "Google Developer Group / On Campus / Obafemi Awolowo University" lockup left;
  organisation address and contact right; no coloured stripe under it.
- Title 26 pt bold, subtitle 14 pt `--link`, body 10.5 to 11 pt Google Sans, line height 1.45.
- Section headings 18 pt bold, numbered only when the document is long and referenced by section.
- Tables: ink header row with white text, light rule between rows, no zebra stripes.
- Callout box: `#E8F6FA` fill, 1 pt ink outline, radius 3 mm, bold heading.
- Footer: document name left, page X of Y right, 8.5 pt muted.
- Cards with hard shadows are allowed for one feature block per page, not for every paragraph.

Generate documents with HTML + CSS (tokens from `tokens/tokens.css`) printed via Chrome headless, or with
the python `reportlab` or `docx` stacks, keeping these specs.
