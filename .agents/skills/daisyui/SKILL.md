---
name: daisyui
description: Use when building or editing UI components with daisyUI 5 and Tailwind CSS 4. Covers installation, all component class names (btn, card, modal, input, etc.), color system, theme configuration, custom themes in OKLCH, and usage rules. Trigger when the task involves HTML/JSX with daisyUI classes, styling with Tailwind CSS 4, or setting up/customizing a daisyUI theme.
license: MIT
compatibility: opencode
---

# daisyUI 5 — Full Reference

daisyUI 5 is a CSS component library for Tailwind CSS 4.
It provides semantic class names for common UI components.

---

## Install

daisyUI 5 requires Tailwind CSS 4. Do NOT use `tailwind.config.js` (deprecated in v4).

**npm:**
```bash
npm i -D daisyui@latest
```

**CSS file:**
```css
@import "tailwindcss";
@plugin "daisyui";
```

**CDN (fallback only):**
```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

---

## Usage Rules

1. Add daisyUI class names directly to HTML elements: component class + optional part/modifier classes
2. Customize with Tailwind utility classes: e.g. `btn px-10`
3. Use `!` suffix to force override if specificity issues: e.g. `btn bg-red-500!` (last resort)
4. If a component doesn't exist in daisyUI, build it with Tailwind utilities
5. Always make `flex` and `grid` layouts responsive with Tailwind responsive prefixes
6. Only use existing daisyUI class names or Tailwind CSS utility classes — no custom CSS unless unavoidable
7. Don't add a custom font unless necessary
8. Don't add `bg-base-100 text-base-content` to body unless necessary
9. For placeholder images use: `https://picsum.photos/200/300`
10. Follow Refactoring UI best practices for design decisions

### Class name categories (reference only, not used in code)
- `component` — required base class
- `part` — child element of a component
- `style` — visual style variant
- `behavior` — changes interaction behavior
- `color` — applies a semantic color
- `size` — xs / sm / md / lg / xl
- `placement` — top / bottom / left / right / start / end / center
- `direction` — horizontal / vertical
- `modifier` — additional modifications
- `variant` — conditional prefix syntax: `variant:utility-class`

---

## Config

```css
/* Minimal */
@plugin "daisyui";

/* Light theme only */
@plugin "daisyui" {
  themes: light --default;
}

/* Default config */
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
  root: ":root";
  include: ;
  exclude: ;
  prefix: ;
  logs: true;
}
```

---

## Color System

### Semantic color names
| Token | Purpose |
|---|---|
| `primary` | Main brand color |
| `primary-content` | Text on primary |
| `secondary` | Secondary brand color |
| `secondary-content` | Text on secondary |
| `accent` | Accent color |
| `accent-content` | Text on accent |
| `neutral` | Neutral dark color |
| `neutral-content` | Text on neutral |
| `base-100` | Page background |
| `base-200` | Elevated surface |
| `base-300` | More elevated surface |
| `base-content` | Text on base |
| `info` | Informative |
| `info-content` | Text on info |
| `success` | Success/safe |
| `success-content` | Text on success |
| `warning` | Warning/caution |
| `warning-content` | Text on warning |
| `error` | Error/danger |
| `error-content` | Text on error |

### Color Rules
- Use `bg-primary`, `text-primary`, etc. — values change with theme automatically
- Avoid hardcoded Tailwind colors like `text-gray-800` for text (breaks dark mode)
- No need for `dark:` prefix with daisyUI colors
- Use `base-*` colors for most of the page; `primary` for important elements only

### Custom Theme
```css
@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
  name: "mytheme";
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: oklch(98% 0.02 240);
  --color-base-200: oklch(95% 0.03 240);
  --color-base-300: oklch(92% 0.04 240);
  --color-base-content: oklch(20% 0.05 240);
  --color-primary: oklch(55% 0.3 240);
  --color-primary-content: oklch(98% 0.01 240);
  --color-secondary: oklch(70% 0.25 200);
  --color-secondary-content: oklch(98% 0.01 200);
  --color-accent: oklch(65% 0.25 160);
  --color-accent-content: oklch(98% 0.01 160);
  --color-neutral: oklch(50% 0.05 240);
  --color-neutral-content: oklch(98% 0.01 240);
  --color-info: oklch(70% 0.2 220);
  --color-info-content: oklch(98% 0.01 220);
  --color-success: oklch(65% 0.25 140);
  --color-success-content: oklch(98% 0.01 140);
  --color-warning: oklch(80% 0.25 80);
  --color-warning-content: oklch(20% 0.05 80);
  --color-error: oklch(65% 0.3 30);
  --color-error-content: oklch(98% 0.01 30);

  --radius-selector: 1rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 1;
  --noise: 0;
}
```
All CSS variables above are required. Use https://daisyui.com/theme-generator/ for visual theme creation.

---

## Components

### accordion
```html
<div class="collapse {MODIFIER}">
  <input type="checkbox" />  <!-- or type="radio" name="group" -->
  <div class="collapse-title">Title</div>
  <div class="collapse-content">Content</div>
</div>
```
- Component: `collapse`
- Parts: `collapse-title`, `collapse-content`
- Style: `collapse-arrow`, `collapse-plus`
- Modifier: `collapse-open`, `collapse-close`

### alert
```html
<div role="alert" class="alert {MODIFIER}">Content</div>
```
- Component: `alert`
- Color: `alert-info`, `alert-success`, `alert-warning`, `alert-error`
- Direction: `alert-vertical`, `alert-horizontal`

### avatar
```html
<div class="avatar {MODIFIER}">
  <div class="{size} rounded-{shape}">
    <img src="..." />
  </div>
</div>
```
- Component: `avatar`
- Part: `avatar-group` (wrapper for multiple)
- Modifier: `avatar-online`, `avatar-offline`, `avatar-placeholder`

### badge
```html
<span class="badge {MODIFIER}">Text</span>
```
- Component: `badge`
- Color: `badge-neutral`, `badge-primary`, `badge-secondary`, `badge-accent`, `badge-info`, `badge-success`, `badge-warning`, `badge-error`, `badge-ghost`
- Size: `badge-xs`, `badge-sm`, `badge-md`, `badge-lg`, `badge-xl`
- Style: `badge-outline`, `badge-dash`, `badge-soft`

### breadcrumbs
```html
<div class="breadcrumbs">
  <ul>
    <li><a>Home</a></li>
    <li><a>Docs</a></li>
    <li>Current</li>
  </ul>
</div>
```
- Component: `breadcrumbs`
- Size: `breadcrumbs-xs`, `breadcrumbs-sm`, `breadcrumbs-md`, `breadcrumbs-lg`, `breadcrumbs-xl`

### button
```html
<button class="btn {MODIFIER}">Button</button>
```
- Component: `btn`
- Style: `btn-outline`, `btn-dash`, `btn-soft`, `btn-ghost`, `btn-link`
- Color: `btn-neutral`, `btn-primary`, `btn-secondary`, `btn-accent`, `btn-info`, `btn-success`, `btn-warning`, `btn-error`
- Size: `btn-xs`, `btn-sm`, `btn-md`, `btn-lg`, `btn-xl`
- Modifier: `btn-wide`, `btn-block`, `btn-square`, `btn-circle`, `btn-active`, `btn-disabled`
- Behavior: `btn-loading`

### card
```html
<div class="card {MODIFIER}">
  <figure><img src="..." /></figure>
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
    <div class="card-actions">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```
- Component: `card`
- Parts: `card-body`, `card-title`, `card-actions`
- Style: `card-bordered`, `card-dash`, `card-side`
- Modifier: `card-compact`, `image-full`
- Color: `card-primary`, `card-secondary`, `card-accent`, `card-neutral`, `card-info`, `card-success`, `card-warning`, `card-error`, `card-ghost`

### carousel
```html
<div class="carousel {MODIFIER}">
  <div class="carousel-item"><img src="..." /></div>
</div>
```
- Component: `carousel`
- Part: `carousel-item`
- Placement: `carousel-center`, `carousel-end`
- Direction: `carousel-vertical`

### chat
```html
<div class="chat {MODIFIER}">
  <div class="chat-image avatar">...</div>
  <div class="chat-header">Name</div>
  <div class="chat-bubble {COLOR}">Message</div>
  <div class="chat-footer">Status</div>
</div>
```
- Component: `chat`
- Parts: `chat-image`, `chat-header`, `chat-bubble`, `chat-footer`
- Placement: `chat-start`, `chat-end`
- Color: `chat-bubble-neutral`, `chat-bubble-primary`, `chat-bubble-secondary`, `chat-bubble-accent`, `chat-bubble-info`, `chat-bubble-success`, `chat-bubble-warning`, `chat-bubble-error`

### checkbox
```html
<input type="checkbox" class="checkbox {MODIFIER}" />
```
- Component: `checkbox`
- Color: `checkbox-primary`, `checkbox-secondary`, `checkbox-accent`, `checkbox-neutral`, `checkbox-success`, `checkbox-warning`, `checkbox-info`, `checkbox-error`
- Size: `checkbox-xs`, `checkbox-sm`, `checkbox-md`, `checkbox-lg`, `checkbox-xl`

### countdown
```html
<span class="countdown">
  <span style="--value:30;"></span>
</span>
```
- Component: `countdown`
- Set `--value` CSS variable to the number to display

### diff
```html
<div class="diff aspect-{ratio}">
  <div class="diff-item-1">Item 1</div>
  <div class="diff-item-2">Item 2</div>
  <div class="diff-resizer"></div>
</div>
```
- Component: `diff`
- Parts: `diff-item-1`, `diff-item-2`, `diff-resizer`

### divider
```html
<div class="divider {MODIFIER}">OR</div>
```
- Component: `divider`
- Color: `divider-neutral`, `divider-primary`, `divider-secondary`, `divider-accent`, `divider-success`, `divider-warning`, `divider-info`, `divider-error`
- Placement: `divider-start`, `divider-end`
- Direction: `divider-vertical`, `divider-horizontal`

### drawer
```html
<div class="drawer {MODIFIER}">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content"><!-- page content --></div>
  <div class="drawer-side">
    <label for="drawer" class="drawer-overlay"></label>
    <ul class="menu">...</ul>
  </div>
</div>
```
- Component: `drawer`
- Parts: `drawer-toggle`, `drawer-content`, `drawer-side`, `drawer-overlay`
- Modifier: `drawer-end`, `drawer-open`

### dropdown
```html
<div class="dropdown {MODIFIER}">
  <div tabindex="0" role="button" class="btn">Click</div>
  <ul tabindex="0" class="dropdown-content menu">
    <li><a>Item</a></li>
  </ul>
</div>
```
- Component: `dropdown`
- Part: `dropdown-content`
- Placement: `dropdown-end`, `dropdown-top`, `dropdown-bottom`, `dropdown-left`, `dropdown-right`
- Modifier: `dropdown-open`, `dropdown-hover`

### fieldset
```html
<fieldset class="fieldset">
  <legend class="fieldset-legend">Legend</legend>
  <label class="fieldset-label">Label</label>
  <input class="input" />
  <span class="fieldset-label">Helper text</span>
</fieldset>
```
- Component: `fieldset`
- Parts: `fieldset-legend`, `fieldset-label`

### file-input
```html
<input type="file" class="file-input {MODIFIER}" />
```
- Component: `file-input`
- Style: `file-input-ghost`
- Color: `file-input-primary`, `file-input-secondary`, `file-input-accent`, `file-input-neutral`, `file-input-success`, `file-input-warning`, `file-input-info`, `file-input-error`
- Size: `file-input-xs`, `file-input-sm`, `file-input-md`, `file-input-lg`, `file-input-xl`

### filter
```html
<div class="filter">
  <input class="btn filter-reset" type="radio" name="filter" aria-label="All" />
  <input class="btn" type="radio" name="filter" aria-label="Option 1" />
</div>
```
- Component: `filter`
- Part: `filter-reset`

### footer
```html
<footer class="footer {MODIFIER}">
  <nav>
    <h6 class="footer-title">Title</h6>
    <a>Link</a>
  </nav>
</footer>
```
- Component: `footer`
- Part: `footer-title`
- Modifier: `footer-horizontal`, `footer-center`

### hero
```html
<div class="hero {HEIGHT}">
  <div class="hero-content {MODIFIER}">
    <h1>Title</h1>
  </div>
</div>
```
- Component: `hero`
- Part: `hero-content`, `hero-overlay`
- Modifier: `hero-content` can be `flex-col` or `flex-col lg:flex-row`

### indicator
```html
<div class="indicator">
  <span class="indicator-item badge badge-primary">New</span>
  <div class="...">Element</div>
</div>
```
- Component: `indicator`
- Part: `indicator-item`
- Placement: `indicator-start`, `indicator-center`, `indicator-end`, `indicator-top`, `indicator-middle`, `indicator-bottom`

### input
```html
<input type="text" class="input {MODIFIER}" placeholder="Text" />
```
- Component: `input`
- Style: `input-ghost`
- Color: `input-primary`, `input-secondary`, `input-accent`, `input-neutral`, `input-success`, `input-warning`, `input-info`, `input-error`
- Size: `input-xs`, `input-sm`, `input-md`, `input-lg`, `input-xl`
- Modifier: `input-bordered` (deprecated, use default)

### join
```html
<div class="join {MODIFIER}">
  <button class="btn join-item">A</button>
  <button class="btn join-item">B</button>
</div>
```
- Component: `join`
- Part: `join-item`
- Direction: `join-vertical`, `join-horizontal`

### kbd
```html
<kbd class="kbd {SIZE}">A</kbd>
```
- Component: `kbd`
- Size: `kbd-xs`, `kbd-sm`, `kbd-md`, `kbd-lg`, `kbd-xl`

### label
```html
<label class="label" for="input-id">Label text</label>
```
- Component: `label`

### link
```html
<a class="link {MODIFIER}">Link</a>
```
- Component: `link`
- Style: `link-hover`
- Color: `link-neutral`, `link-primary`, `link-secondary`, `link-accent`, `link-success`, `link-warning`, `link-info`, `link-error`

### loading
```html
<span class="loading {MODIFIER}"></span>
```
- Component: `loading`
- Style: `loading-spinner`, `loading-dots`, `loading-ring`, `loading-ball`, `loading-bars`, `loading-infinity`
- Color: `loading-neutral`, `loading-primary`, `loading-secondary`, `loading-accent`, `loading-info`, `loading-success`, `loading-warning`, `loading-error`
- Size: `loading-xs`, `loading-sm`, `loading-md`, `loading-lg`, `loading-xl`

### mask
```html
<img class="mask {MODIFIER}" src="..." />
```
- Component: `mask`
- Style: `mask-squircle`, `mask-heart`, `mask-hexagon`, `mask-hexagon-2`, `mask-decagon`, `mask-pentagon`, `mask-diamond`, `mask-square`, `mask-circle`, `mask-parallelogram`, `mask-parallelogram-2`, `mask-parallelogram-3`, `mask-parallelogram-4`, `mask-star`, `mask-star-2`, `mask-triangle`, `mask-triangle-2`, `mask-triangle-3`, `mask-triangle-4`
- Modifier: `mask-half-1`, `mask-half-2`

### menu
```html
<ul class="menu {MODIFIER}">
  <li class="menu-title">Title</li>
  <li><a>Item</a></li>
  <li>
    <details>
      <summary>Parent</summary>
      <ul><li><a>Sub item</a></li></ul>
    </details>
  </li>
</ul>
```
- Component: `menu`
- Parts: `menu-title`
- Size: `menu-xs`, `menu-sm`, `menu-md`, `menu-lg`, `menu-xl`
- Direction: `menu-vertical`, `menu-horizontal`
- Modifier: `menu-dropdown`, `menu-dropdown-show`

### modal
```html
<dialog id="modal" class="modal {MODIFIER}">
  <div class="modal-box">
    <h3>Title</h3>
    <p>Content</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```
- Open with: `document.getElementById('modal').showModal()`
- Component: `modal`
- Parts: `modal-box`, `modal-action`, `modal-backdrop`
- Placement: `modal-top`, `modal-middle`, `modal-bottom`, `modal-start`, `modal-end`
- Modifier: `modal-open`

### navbar
```html
<div class="navbar {COLOR}">
  <div class="navbar-start">...</div>
  <div class="navbar-center">...</div>
  <div class="navbar-end">...</div>
</div>
```
- Component: `navbar`
- Parts: `navbar-start`, `navbar-center`, `navbar-end`
- Color: `navbar-neutral`, `navbar-primary`, `navbar-secondary`, `navbar-accent`, `navbar-ghost`

### pagination
```html
<div class="join">
  <button class="join-item btn">«</button>
  <button class="join-item btn btn-active">1</button>
  <button class="join-item btn">2</button>
  <button class="join-item btn">»</button>
</div>
```
Use `join` + `btn` components for pagination.

### progress
```html
<progress class="progress {MODIFIER}" value="70" max="100"></progress>
```
- Component: `progress`
- Color: `progress-neutral`, `progress-primary`, `progress-secondary`, `progress-accent`, `progress-info`, `progress-success`, `progress-warning`, `progress-error`

### radial-progress
```html
<div class="radial-progress" style="--value:70;" role="progressbar">70%</div>
```
- Component: `radial-progress`
- Set `--value` (0-100), `--size`, `--thickness` CSS variables
- Color: use text color utilities

### radio
```html
<input type="radio" name="radio" class="radio {MODIFIER}" />
```
- Component: `radio`
- Color: `radio-primary`, `radio-secondary`, `radio-accent`, `radio-neutral`, `radio-success`, `radio-warning`, `radio-info`, `radio-error`
- Size: `radio-xs`, `radio-sm`, `radio-md`, `radio-lg`, `radio-xl`

### range
```html
<input type="range" class="range {MODIFIER}" min="0" max="100" />
```
- Component: `range`
- Color: `range-primary`, `range-secondary`, `range-accent`, `range-neutral`, `range-success`, `range-warning`, `range-info`, `range-error`
- Size: `range-xs`, `range-sm`, `range-md`, `range-lg`, `range-xl`

### rating
```html
<div class="rating {MODIFIER}">
  <input type="radio" name="rating" class="mask mask-star" />
  <input type="radio" name="rating" class="mask mask-star" checked />
</div>
```
- Component: `rating`
- Modifier: `rating-half`
- Size: `rating-xs`, `rating-sm`, `rating-md`, `rating-lg`, `rating-xl`

### select
```html
<select class="select {MODIFIER}">
  <option disabled selected>Pick one</option>
  <option>Option 1</option>
</select>
```
- Component: `select`
- Style: `select-ghost`
- Color: `select-primary`, `select-secondary`, `select-accent`, `select-neutral`, `select-success`, `select-warning`, `select-info`, `select-error`
- Size: `select-xs`, `select-sm`, `select-md`, `select-lg`, `select-xl`

### skeleton
```html
<div class="skeleton h-32 w-32"></div>
```
- Component: `skeleton`
- Use with Tailwind sizing utilities

### stack
```html
<div class="stack">
  <div class="card bg-primary text-primary-content">1</div>
  <div class="card bg-secondary text-secondary-content">2</div>
  <div class="card bg-accent text-accent-content">3</div>
</div>
```
- Component: `stack`

### stat
```html
<div class="stats {MODIFIER}">
  <div class="stat">
    <div class="stat-figure">icon</div>
    <div class="stat-title">Title</div>
    <div class="stat-value">Value</div>
    <div class="stat-desc">Description</div>
    <div class="stat-actions">actions</div>
  </div>
</div>
```
- Component: `stats`
- Parts: `stat`, `stat-title`, `stat-value`, `stat-desc`, `stat-figure`, `stat-actions`
- Direction: `stats-vertical`, `stats-horizontal`

### steps
```html
<ul class="steps {MODIFIER}">
  <li class="step step-primary">Step 1</li>
  <li class="step step-primary">Step 2</li>
  <li class="step">Step 3</li>
</ul>
```
- Component: `steps`
- Part: `step`
- Color: `step-primary`, `step-secondary`, `step-accent`, `step-neutral`, `step-info`, `step-success`, `step-warning`, `step-error`
- Direction: `steps-vertical`, `steps-horizontal`

### swap
```html
<label class="swap {MODIFIER}">
  <input type="checkbox" />
  <div class="swap-on">ON</div>
  <div class="swap-off">OFF</div>
</label>
```
- Component: `swap`
- Parts: `swap-on`, `swap-off`, `swap-indeterminate`
- Style: `swap-rotate`, `swap-flip`
- Modifier: `swap-active`

### table
```html
<div class="overflow-x-auto">
  <table class="table {MODIFIER}">
    <thead><tr><th>Col</th></tr></thead>
    <tbody><tr><td>Data</td></tr></tbody>
  </table>
</div>
```
- Component: `table`
- Modifier: `table-zebra`, `table-zebra-zebra`, `table-pin-rows`, `table-pin-cols`
- Size: `table-xs`, `table-sm`, `table-md`, `table-lg`, `table-xl`

### tabs
```html
<div role="tablist" class="tabs {MODIFIER}">
  <a role="tab" class="tab">Tab 1</a>
  <a role="tab" class="tab tab-active">Tab 2</a>
</div>
```
- Component: `tabs`
- Part: `tab`, `tab-content`
- Style: `tabs-bordered`, `tabs-lifted`, `tabs-box`
- Size: `tabs-xs`, `tabs-sm`, `tabs-md`, `tabs-lg`, `tabs-xl`
- Modifier: `tab-active`, `tab-disabled`

### textarea
```html
<textarea class="textarea {MODIFIER}" placeholder="Text"></textarea>
```
- Component: `textarea`
- Style: `textarea-ghost`
- Color: `textarea-neutral`, `textarea-primary`, `textarea-secondary`, `textarea-accent`, `textarea-info`, `textarea-success`, `textarea-warning`, `textarea-error`
- Size: `textarea-xs`, `textarea-sm`, `textarea-md`, `textarea-lg`, `textarea-xl`

### theme-controller
```html
<input type="checkbox" value="{theme-name}" class="theme-controller" />
```
- Component: `theme-controller`
- Value must be a valid daisyUI theme name

### timeline
```html
<ul class="timeline {MODIFIER}">
  <li>
    <div class="timeline-start">{start}</div>
    <div class="timeline-middle">{icon}</div>
    <div class="timeline-end">{end}</div>
    <hr/>
  </li>
</ul>
```
- Component: `timeline`
- Parts: `timeline-start`, `timeline-middle`, `timeline-end`
- Modifier: `timeline-snap-icon`, `timeline-box`, `timeline-compact`
- Direction: `timeline-vertical`, `timeline-horizontal`

### toast
```html
<div class="toast {MODIFIER}">
  <div class="alert alert-info">Message</div>
</div>
```
- Component: `toast`
- Placement: `toast-start`, `toast-center`, `toast-end`, `toast-top`, `toast-middle`, `toast-bottom`

### toggle
```html
<input type="checkbox" class="toggle {MODIFIER}" />
```
- Component: `toggle`
- Color: `toggle-primary`, `toggle-secondary`, `toggle-accent`, `toggle-neutral`, `toggle-success`, `toggle-warning`, `toggle-info`, `toggle-error`
- Size: `toggle-xs`, `toggle-sm`, `toggle-md`, `toggle-lg`, `toggle-xl`

### tooltip
```html
<div class="tooltip {MODIFIER}" data-tip="Tooltip text">
  <button class="btn">Hover me</button>
</div>
```
- Component: `tooltip`
- Part: `tooltip-content`
- Modifier: `tooltip-open`
- Placement: `tooltip-top`, `tooltip-bottom`, `tooltip-left`, `tooltip-right`
- Color: `tooltip-primary`, `tooltip-secondary`, `tooltip-accent`, `tooltip-info`, `tooltip-success`, `tooltip-warning`, `tooltip-error`

### validator
```html
<input type="{type}" class="input validator" required />
<p class="validator-hint">Error message</p>
```
- Component: `validator`
- Part: `validator-hint`
- Use with `input`, `select`, `textarea`

---

## Built-in Themes

Apply with `data-theme="THEME_NAME"` on `<html>`:

`light`, `dark`, `cupcake`, `bumblebee`, `emerald`, `corporate`, `synthwave`, `retro`, `cyberpunk`, `valentine`, `halloween`, `garden`, `forest`, `aqua`, `lofi`, `pastel`, `fantasy`, `wireframe`, `black`, `luxury`, `dracula`, `cmyk`, `autumn`, `business`, `acid`, `lemonade`, `night`, `coffee`, `winter`, `dim`, `nord`, `sunset`, `caramellatte`, `abyss`, `silk`
