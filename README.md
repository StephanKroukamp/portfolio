# Stephan Kroukamp — Portfolio

Personal CV / portfolio site, served via GitHub Pages.

**Live:** https://stephankroukamp.github.io/portfolio/

## Stack

Vanilla HTML, CSS, and JavaScript. No build step.

```
portfolio/
├── index.html
├── assets/
│   ├── styles.css
│   ├── script.js
│   └── favicon.svg
├── cv/
│   ├── cv.html       # source for the downloadable CV
│   └── build.sh      # renders cv.html → Stephan_Kroukamp_CV.pdf
├── Stephan_Kroukamp_CV.pdf
└── .nojekyll
```

## Updating the CV

Edit `cv/cv.html`, then regenerate the PDF with headless Chrome/Edge:

```bash
bash cv/build.sh
```

Bump the `?v=` query on the download link in `index.html` so visitors don't get a cached copy.

## Easter egg

Click the **SK** monogram in the header to toggle between dark and light themes.
The Konami code (↑ ↑ ↓ ↓ ← → ← → B A) does the same.

## Local development

Just open `index.html` in a browser — there is no build step.
