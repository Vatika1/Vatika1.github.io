# Vatika Prasad — Portfolio

Single-page portfolio for Vatika Prasad. Plain HTML, CSS, and vanilla JS — no frameworks, no build step, no `node_modules`.

Live at: <https://vatika1.github.io/>

## File structure

```
.
├── index.html      All markup and content lives here
├── styles.css      Light editorial theme; design tokens at the top
├── script.js       Mobile menu, active-nav, reveal animations, contact form
└── README.md
```

Fonts (Inter + Fraunces) are loaded from Google Fonts via `<link>` in `index.html`.

## Local preview

Open `index.html` in a browser, or run any static server from the repo root:

```bash
# Python 3
python -m http.server 8000

# Node (no install)
npx --yes serve .

# VS Code: install the "Live Server" extension and click "Go Live"
```

Then visit <http://localhost:8000/>.

## Deploy via GitHub Pages

This repo is named `Vatika1.github.io`, so GitHub Pages serves it automatically as a user site — no GitHub Actions or workflow file needed.

1. Push to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Source: **Deploy from a branch**, Branch: **main**, Folder: **`/ (root)`**.
4. Save. The site will be available at `https://vatika1.github.io/` within a minute or two.

That's it. Plain HTML/CSS/JS at the repo root needs no build step.

## How to update content

All content lives in `index.html`. Search for the section comment (e.g. `<!-- HERO -->`) and edit in place.

### Hero
Edit the headline, subhead, meta line, tech pills, and CTAs in the `<section id="hero">` block.

### About
Two-column layout in `<section id="about">`:
- Left: `.about-prose` — three `<p>` paragraphs.
- Right: `.about-cards` — three `<article class="feature-card">` blocks.
- Below: `.education-strip` for the BSc line.

### Expertise (2×2 grid)
Each card in `<section id="expertise">` is an `<article class="expertise-card">` with a `.card-marker` SVG, an `<h3>`, a `<p>`, and a `.pill-row.tight`. To add a fifth card, just append another `<article>` — it'll wrap onto a new row.

### Skills
Each group in `<section id="skills">` is an `<article class="skill-card">` containing an `<h3>` and a `<ul class="pill-row tight">` of `<li class="pill">…</li>` items. To mark a pill as expert, wrap the name in `<span class="pill-strong">…</span>` and add `<span class="pill-note">Expert</span>`.

### Projects
- The featured project is `<article class="project-card featured">` in `<section id="projects">`. Its sub-component cards live inside `.subcomponents`.
- The GitHub link is the `<a class="project-link" href="…">` near the bottom — replace `href="#"` with the real repo URL.
- The second card (`.project-card.placeholder`) is the "more coming soon" tile; replace it with another full `.project-card` to add another project.

### Experience
Each role in `<section id="experience">` is a `<li class="experience-card">`. Inside:
- `.exp-role` — job title
- `.exp-meta` — company · location
- `.exp-date` — date range and employment type
- `.exp-bullets` — `<li>` items (the dash marker is added by CSS)
- `.pill-row.tight` — tech pills

To fill in the TBD entries, just replace the placeholder bullet text and date strings in place.

### Contact
- Form action is set to `https://formspree.io/f/mrejjpln`. To change the destination, update the `action` attribute on `<form id="contact-form">`.
- Contact details live in `<aside class="contact-card">`.

## How to change the accent color

Open `styles.css` and edit the four `--accent*` tokens at the top of `:root`:

```css
:root {
  --accent: #1f4d3d;
  --accent-strong: #163a2d;
  --accent-soft: rgba(31, 77, 61, 0.08);
  --accent-line: rgba(31, 77, 61, 0.22);
  …
}
```

Set `--accent` to your new color, `--accent-strong` a few shades darker for hover states, and use the same RGB values in the two `rgba(...)` lines for the soft and line variants.

Other palette tokens you may want to tweak (also in `:root`): `--bg`, `--text`, `--border`, `--pill-bg`.

## Accessibility notes

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Skip-to-content link at the top.
- All form fields have associated `<label>` elements.
- Focus states are visible on every interactive element (`:focus-visible`).
- `prefers-reduced-motion` is respected — scroll-fade animations are disabled for users who request reduced motion.
- Color contrast meets WCAG AA against the warm off-white background.

## What changes if you fork

Update these to point at the new owner:
- `<meta property="og:url">` in `index.html`
- `https://github.com/Vatika1` links in the contact card and footer
- `https://www.linkedin.com/in/vatikaprasad` links
- The Formspree form `action` (create your own form at <https://formspree.io>)
- The `mailto:` email address
- The brand monogram (`VP`) and wordmark in the header
