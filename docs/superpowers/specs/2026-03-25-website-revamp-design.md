# Website Revamp Design — Giovani Cooperatori Trentini

**Date:** 2026-03-25
**Status:** Approved

---

## Overview

Full redesign of `giovanicooperatoritrentini.eu` from a tab-based single-page layout to a modern scrollable landing page. The existing brand identity (teal color scheme, Inter font, logo) is retained and elevated. No new dependencies are introduced — the implementation uses pure HTML and CSS.

**Jake** is a JavaScript build tool (like Make) used in this project for task automation. It does not generate HTML. `index.html` is hand-edited directly and Jake does not need to be changed.

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Revamp scope | Full (layout + visual polish) | Tab-based layout feels dated; a scrollable landing page is more appealing and more standard for small orgs |
| Visual style | Refined Teal | Keep brand recognition, improve hierarchy and whitespace |
| Page structure | Hero → Sections → Footer | Classic, scannable landing page; each section is independently reachable via sticky nav |
| Hero treatment | Gradient teal (no photo) | More timeless than a photo hero; no image maintenance burden |
| Tech stack | Pure HTML/CSS, no new dependencies | Keeps the project simple and maintainable; Jake build tool unchanged |
| Mobile nav | Show links inline, no hamburger | Avoids extra JS complexity; links are short enough to fit on one row at small sizes |
| Icons | Inline Unicode emoji | No icon library; use `📄`, `✍️`, `🏢` for link list items and text "IG", "FB" for social ghost buttons |

---

## Color System

All tokens are defined as CSS custom properties in `:root {}` in `style.css`. Always reference them with `var()`.

| Custom property | Value | Usage |
|---|---|---|
| `--color-dark` | `#094756` | Hero, nav, footer backgrounds |
| `--color-mid` | `#46a2b9` | Buttons, section labels, accents |
| `--color-light` | `#a2d9f7` | Hover states |
| `--color-surface` | `#f7fbfd` | Card/link-item backgrounds |
| `--color-border` | `#e8f4f8` | Borders, e.g. `1.5px solid var(--color-border)` |
| `--color-text` | `#1a1a1a` | Body text |
| `--color-text-muted` | `#444` | Secondary body text |

---

## Typography

- **Font:** Inter (Google Fonts). Import weights 400, 500, 600, 700 only.
- **Hierarchy:**
  - Section label: 11px / 700 / 0.12em letter-spacing / uppercase / `var(--color-mid)`
  - Section title: 26px / 700 / `var(--color-dark)`
  - Body: 15px / 400 / 1.7 line-height / `var(--color-text-muted)`
  - Event title: 18px / 600 / `var(--color-dark)`
  - Nav links: 13px / 500

---

## HTML Document Head

```html
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Giovani Cooperatori Trentini</title>
  <meta name="description" content="Formazione cooperativa, civile e culturale">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
</head>
```

---

## Page Semantic Structure

```
<body>
  <nav>              ← sticky navigation
  <header>           ← hero section (NOT a <section>)
  <main>
    <section id="attivita">
    <section id="chi-siamo">
    <section id="contatti">
  </main>
  <footer>
  <script>           ← GoatCounter analytics (keep from current index.html)
</body>
```

The section separator CSS rule `section + section { border-top: 1px solid var(--color-border); }` works correctly because the hero is a `<header>`, not a `<section>`, so the Attività section has no border-top.

---

## Layout & Spacing

- **Content width pattern:** Each `<section>` is full-width. Inside each section, a `.container` div constrains content: `max-width: 860px; margin: 0 auto; padding-top: 64px; padding-bottom: 64px; padding-left: 40px; padding-right: 40px`. This lets section backgrounds extend to full-width in the future while keeping text readable.
- **Section separator:** `section + section { border-top: 1px solid var(--color-border); }` — applied only between sibling `<section>` elements inside `<main>`.
- **Scroll offset for sticky nav:** `section { scroll-margin-top: 52px; }` so anchor links land below the 52px nav bar.
- **Smooth scrolling:** `html { scroll-behavior: smooth; }`
- **`reset.css`:** copy from existing codebase unchanged — do not recreate or replace it.
- Card border-radius: 12px; internal padding: 24px.

---

## Button Styles

Two button variants, used as anchor tags (`<a class="btn btn-primary">`):

**Primary (`.btn-primary`):**
- `background: var(--color-mid)` (`#46a2b9`); `color: white`
- `padding: 10px 22px`; `border-radius: 8px`; `font-size: 14px`; `font-weight: 600`
- `display: inline-flex; align-items: center; gap: 6px`
- Hover: `background: #3a8fa5`

**Secondary (`.btn-secondary`):**
- `background: transparent`; `color: var(--color-mid)`; `border: 1.5px solid var(--color-mid)`
- Same padding/radius/font as primary
- Hover: `background: var(--color-surface)`

---

## Sticky Navigation

- Element: `<nav>`
- `position: sticky; top: 0; z-index: 100`
- `background: var(--color-dark)`; height: 52px; `box-shadow: 0 2px 12px rgba(0,0,0,0.2)`
- `display: flex; align-items: center; justify-content: space-between; padding: 0 40px`
- **Left:** `<span>` "Giovani Cooperatori Trentini" — 13px / 600 / uppercase / letter-spacing 0.05em / `rgba(255,255,255,0.9)`
- **Right:** `<ul>` with three `<li><a>` links — "Attività" → `#attivita`, "Chi Siamo" → `#chi-siamo`, "Contatti" → `#contatti`; default `rgba(255,255,255,0.75)`; gap 32px; 13px / 500. Apply `list-style: none; margin: 0; padding: 0` to both `<ul>` and `<li>` elements to override any browser defaults not covered by reset.css.
- **Active link:** color `var(--color-light)` + font-weight 600; no underline, no background change

### Active Link JS (`js/main.js`)

Replace current tab-switching code entirely. `js/main.js` currently contains only tab-switching logic — there is no other code to preserve.

Load `main.js` at the bottom of `<body>`, before the GoatCounter script (matching current placement):
```html
  <script src="js/main.js"></script>
  <script data-goatcounter="..." async src="//gc.zgo.at/count.js"></script>
</body>
```

New `main.js` content — uses `IntersectionObserver` with `rootMargin` to detect which section is at the top of the viewport. The first section is activated on page load. When scrolling leaves a gap where no section intersects the detection zone, the last active link stays highlighted (acceptable — standard behavior):

```js
const sections = [...document.querySelectorAll('main section')];
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function setActive(id) {
  navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
  );
}

// Activate first section on load
if (sections[0]) setActive(sections[0].id);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, {
  rootMargin: '-52px 0px -80% 0px',
  threshold: 0
});

sections.forEach(s => observer.observe(s));
```

The `-52px` top rootMargin compensates for the sticky nav. The `-80%` bottom margin constrains the detection zone to the top 20% of the viewport, ensuring the section that owns the top of the page is always preferred.

CSS for active and hover nav links:
```css
nav a:hover {
  color: var(--color-light);
}
nav a.active {
  color: var(--color-light);
  font-weight: 600;
}
```

---

## Hero (`<header>`)

- `background: linear-gradient(135deg, #094756 0%, #46a2b9 100%)`
- `min-height: 420px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 24px; gap: 20px`
- **Logo:** `<img src="img/logo.png" alt="Giovani Cooperatori Trentini">` — `img/logo.png` exists in the repo. Wrapper div: 100×100px, `border-radius: 50%`, white background, `box-shadow: 0 8px 32px rgba(0,0,0,0.2)`, `overflow: hidden`. Add `onerror="this.style.display='none'"` on the img tag.
- **`<h1>`:** "Giovani Cooperatori Trentini" — white, 32px / 700 / line-height 1.2 / letter-spacing -0.02em
- **`<p>` tagline:** "Voci che si intrecciano: prospettive giovani per una storia condivisa" — `rgba(255,255,255,0.8)`, 16px / 400 / max-width 480px / line-height 1.5
- **Social row:** flex row, gap 12px. Two `<a>` tags styled as ghost circles:
  - 36×36px; `border-radius: 50%`; `background: rgba(255,255,255,0.15)`; `border: 1px solid rgba(255,255,255,0.3)`; `color: white`; 13px / 600; `text-decoration: none`; `display: flex; align-items: center; justify-content: center`
  - Hover: `background: rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.5)`
  - Instagram → `https://www.instagram.com/giovanicooperatoritrentini` — label "IG" — `target="_blank" rel="noopener noreferrer"`
  - Facebook → `https://www.facebook.com/giovanicooperatoritrentini` — label "FB" — `target="_blank" rel="noopener noreferrer"`

---

## Attività Section (`<section id="attivita">`)

- Section label: "Attività"
- Section title: "Prossimi eventi"
- Intro: "Partecipa ai nostri eventi e iniziative per giovani cooperatori del Trentino."
- **Event data:** hardcoded in HTML. Each event is one `.event-card` div. Use the events from the current `index.html` as the starting content. If there are no current events, use the empty state instead.

**Event card (`.event-card`):**
- `border: 1.5px solid var(--color-border)`; border-radius 12px; padding 24px; `background: var(--color-surface)`; `display: flex; flex-direction: column; gap: 12px`; margin-top: 24px
- `.event-date`: "12 Aprile 2025" *(example — substitute actual upcoming event date before shipping)* — 12px / 600 / uppercase / `var(--color-mid)` / letter-spacing 0.06em
- `.event-title`: "Assemblea Ordinaria" — 18px / 600 / `var(--color-dark)`
- `.event-desc`: "In collaborazione con Economika — uno spazio per parlare di temi economico-politici, educazione finanziaria e data journalism." — 14px / `var(--color-text-muted)` / line-height 1.6
- CTA: `<a class="btn btn-primary" href="https://bit.ly/agct2025" target="_blank" rel="noopener noreferrer">Iscriviti all'evento →</a>`

**Empty state:** if there are no events, replace the event card(s) with:
```html
<p class="empty-state">Nessun evento in programma al momento. Seguici sui social per aggiornamenti.</p>
```
Styled as: `color: var(--color-text-muted)`, italic, margin-top 16px.

---

## Chi Siamo Section (`<section id="chi-siamo">`)

- Section label: "Chi Siamo"
- Section title: "La nostra associazione"
- Body: "Giovani Cooperatori Trentini è un'associazione che promuove i valori della cooperazione tra le giovani generazioni del Trentino. Scopri il nostro statuto o diventa socio."

**Link list** — three `.link-item` anchor rows. Each: `display: flex; align-items: center; gap: 12px`; `border: 1.5px solid var(--color-border)`; border-radius 10px; padding `14px 18px`; `background: var(--color-surface)`; `color: var(--color-dark)`; font-size 14px / 500; `text-decoration: none`. Hover: `border-color: var(--color-mid); background: #edf6fa` (`#edf6fa` is intentionally hardcoded — a tint of `--color-surface`; not tokenised). All open in new tab: `target="_blank" rel="noopener noreferrer"`.

| Emoji | Label | `href` |
|---|---|---|
| 📄 | Statuto dell'associazione | `https://www.cooperazionetrentina.it/media/ob3c3xae/statuto-agct.pdf` |
| ✍️ | Modulo iscrizione — Persona fisica | `attachments/modulo_iscrizione_pf.pdf` |
| 🏢 | Modulo iscrizione — Ente | `attachments/modulo_iscrizione_enti.pdf` |

Emoji wrapped in `.link-icon` div: 32×32px; border-radius 8px; `background: #e0f0f5`; `display: flex; align-items: center; justify-content: center`; flex-shrink 0.

---

## Contatti Section (`<section id="contatti">`)

- Section label: "Contatti"
- Section title: "Scrivici"
- Intro: "Siamo raggiungibili via email o telefono. Puoi anche seguirci sui social."

**Contact grid:** `display: grid; grid-template-columns: 1fr 1fr; gap: 16px`; margin-top 20px.

Each `.contact-card`: padding 20px; border-radius 12px; `border: 1.5px solid var(--color-border)`; `background: var(--color-surface)`; `display: flex; flex-direction: column; gap: 6px`.

- `.contact-type`: 11px / 700 / uppercase / letter-spacing 0.1em / `var(--color-mid)`
- `.contact-value`: 15px / 500 / `var(--color-dark)`; wrapped in `<a>` tag (clickable)

| Type label | Displayed value | `href` |
|---|---|---|
| Email | `associazione.giovani@ftcoop.it` | `mailto:associazione.giovani@ftcoop.it` |
| Telefono | `+39 0461 898601` | `tel:+390461898601` |

The `<a>` tags: `color: var(--color-dark); text-decoration: none` (explicit color, not `inherit`, to override browser link defaults). No `target="_blank"` (mailto/tel open native apps).

---

## Footer (`<footer>`)

- `background: var(--color-dark)`; `padding: 32px 40px`; `text-align: center`
- Text: "© 2026 Giovani Cooperatori Trentini" — `color: rgba(255,255,255,0.6)`; font-size 13px
- Year is the current calendar year (2026 at time of writing); update manually each year

---

## GoatCounter Analytics

Keep the existing `<script>` tag from the current `index.html` verbatim, placed immediately before `</body>`.

---

## Mobile Breakpoint (`@media (max-width: 768px)`)

| Element | Desktop | Mobile |
|---|---|---|
| Nav brand text | Visible | `display: none` |
| Nav links gap | 32px | 16px; font-size 12px |
| Nav padding | `0 40px` | `0 16px` |
| Hero `<h1>` | 32px | 24px |
| Hero min-height | 420px | 320px |
| Hero padding | `60px 24px` | `40px 20px` |
| `.container` padding | top/bottom 64px, left/right 40px | top/bottom 40px, left/right 20px |
| Event card | Full width | Full width (unchanged) |
| Contact grid | `1fr 1fr` | `1fr` (stack) |

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Full rewrite — new semantic structure with all sections |
| `css/style.css` | Full rewrite — CSS custom properties, new design system |
| `css/reset.css` | No changes |
| `js/main.js` | Replace tab-switching logic with `IntersectionObserver` nav highlight |

---

## Out of Scope

- No new pages — single `index.html`
- No CSS animations or scroll-triggered effects
- No hamburger menu — nav links stay visible on mobile
- No changes to `attachments/`, `img/` directory, or `CNAME`
- No changes to GoatCounter analytics script content
- No Jake configuration changes
