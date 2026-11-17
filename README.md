# Pratiksha Satpute – Portfolio

Static portfolio (HTML, CSS, JavaScript). No build step.

## Structure
- `index.html` – page structure
- `css/style.css` – styles
- `js/script.js` – content data (projects, skills, certifications) + interactions
- `assets/` – resume PDF, favicon

## Edit content
Open `js/script.js` and change the `projects`, `skills` or `certs` lists at the top.

## Contact form (optional)
1. Create a free form at https://formspree.io and copy its URL.
2. Paste it into `FORM_ENDPOINT` in `js/script.js`.
Without it, the form opens the visitor's email app with the message filled in.

## Deploy free (Vercel)
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → pick the repo → Deploy.
   (Framework preset: Other. No build command. Output directory: leave empty.)
3. Every `git push` redeploys automatically.

## Run locally
Open `index.html` in a browser, or run `python -m http.server` and visit localhost:8000.
