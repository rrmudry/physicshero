# PhysicsHero.net

Interactive physics simulations, computational models, and educational tools.

Hosted live at: **[physicshero.net](https://physicshero.net)**

---

## 🔬 About

This repository hosts sanitized, public-ready web applications and interactive simulations adapted from classroom physics curriculum originally developed by **R. Mudry** (`rrmudry/rrmudry.github.io`).

All student records, course-specific grading materials, and internal resources have been removed to create a clean, accessible showcase for learners, educators, and physics enthusiasts.

## 🚀 Structure

- `index.html` - Main portal landing page and simulation catalog
- `CNAME` - Custom domain configuration for GitHub Pages (`physicshero.net`)
- `.nojekyll` - Ensures direct static asset serving without Jekyll interference
- `css/` - Global styling and design system
- `js/` - Interactive scripts and canvas simulations
- `sound-wave-lab/` - Sound Wave Studio (tuning fork sinusoidal modeling lab), served at physicshero.net/sound-wave-lab/

## 🛠️ Local Development

Simply open `index.html` in any modern web browser or serve locally using any static web server:

```bash
# Python 3
python -m http.server 8000

# or Node.js / npx
npx serve .
```
