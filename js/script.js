// ===== Edit your content here =====
const FORM_ENDPOINT = ""; // paste your Formspree URL, e.g. https://formspree.io/f/xxxxxx
const EMAIL = "pratikshasatpute2005@gmail.com";

const projects = [
  { cats: ["Python & data","Web"], title: "Learning Gap Analyzer", status: "In progress · Final-year major project", featured: true,
    summary: "AI-powered system that evaluates subjective student answers, maps them to a knowledge graph and finds concept-level learning gaps. Built by team Neural Nexus (4 members).",
    points: ["My part: NLP and gap detection with expected concepts, keyword matching and a coverage score.",
             "Uses Sentence Transformers for semantic similarity and spaCy for text processing.",
             "Stack also includes React, FastAPI, PostgreSQL and Neo4j."],
    tags: ["Python", "FastAPI", "spaCy", "Sentence Transformers", "Neo4j", "React"],
    links: [["Team repo", "https://github.com/sakshik2001eng/learning-gap-analyzer"]] },
  { cats: ["Web"], title: "Dwanikosh", status: "Internship project · MERN",
    summary: "Full-stack music player with secure authentication and personal library management.",
    points: ["Sign-up, login and session management flows.", "Node.js and Express.js APIs backed by MongoDB.", "Responsive React and Tailwind CSS interface."],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: [["GitHub profile", "https://github.com/Pratiksha-IT"]] },
  { cats: ["Web","Python & data"], title: "Pharmacy Management System", status: "Academic project",
    summary: "Automates sales, inventory and supplier management for a pharmacy.",
    points: ["Dashboard for revenue, low-stock alerts and sales trends.", "Automated billing and live inventory tracking to reduce data-entry errors."],
    tags: ["Python", "MongoDB", "HTML", "CSS", "JavaScript"],
    links: [["GitHub profile", "https://github.com/Pratiksha-IT"]] },
  { cats: ["Java"], title: "Banking System", status: "Academic project",
    summary: "Java application built to practise object-oriented design and database connectivity.",
    points: ["Core banking operations modelled with OOP.", "JDBC connection to a MySQL database."],
    tags: ["Java", "JDBC", "MySQL"],
    links: [["GitHub profile", "https://github.com/Pratiksha-IT"]] }
];

const skills = {
  "Languages": ["Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"],
  "Web": ["React.js", "Node.js", "Express.js", "Tailwind CSS"],
  "Databases": ["MongoDB", "MySQL"],
  "Data science": ["NumPy", "Pandas (basics)", "Data visualization"],
  "Concepts": ["OOP", "MERN stack", "REST APIs"],
  "Tools": ["Git", "GitHub", "VS Code", "Postman"]
};

const certs = [
  ["SQL", "HackerRank"], ["Responsive Web Design", "freeCodeCamp"],
  ["Python Programming", "CodeWithHarry"], ["Data Science", "CodeWithHarry · in progress"]
];

// ===== Rendering =====
const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };
const norm = s => s.toLowerCase().replace(/\.js$/, "").replace(/\s*\(.*\)/, "");
const cats = ["All", "Web", "Python & data", "Java"];
const state = { cat: "All", tech: null };

function renderProjects() {
  const f = $("#filters"); f.innerHTML = "";
  cats.forEach(c => {
    const on = state.cat === c && !state.tech;
    const b = el("button", "fbtn" + (on ? " on" : ""), c); b.type = "button"; b.setAttribute("aria-pressed", on);
    b.onclick = () => { state.cat = c; state.tech = null; renderProjects(); }; f.append(b);
  });
  if (state.tech) { const t = el("button", "fbtn on", `Uses ${state.tech} ✕`); t.type = "button"; t.onclick = () => { state.tech = null; renderProjects(); }; f.append(t); }
  const list = projects.filter(p => state.tech
    ? p.tags.some(t => { const a = norm(t), b = norm(state.tech); return a.includes(b) || b.includes(a); })
    : state.cat === "All" || p.cats.includes(state.cat));
  const grid = $("#projectGrid"); grid.innerHTML = "";
  if (!list.length) { grid.append(el("p", "empty", `No project lists ${state.tech} yet. Clear the filter to see all projects.`)); return; }
  list.forEach(p => {
    const a = el("article", "project" + (p.featured ? " featured" : ""),
      `<p class="meta">${p.status}</p><h3>${p.title}</h3><p>${p.summary}</p>
       <ul class="points">${p.points.map(x => `<li>${x}</li>`).join("")}</ul>
       <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
       <div class="plinks">${p.links.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${l} ↗</a>`).join("")}</div>`);
    const pts = a.querySelector(".points"); pts.hidden = !p.featured;
    const m = el("button", "more", p.featured ? "Hide details" : "Show details"); m.type = "button"; m.setAttribute("aria-expanded", !!p.featured);
    m.onclick = () => { pts.hidden = !pts.hidden; m.textContent = pts.hidden ? "Show details" : "Hide details"; m.setAttribute("aria-expanded", !pts.hidden); };
    a.insertBefore(m, a.querySelector(".tags")); grid.append(a);
  });
}

$("#skillGrid").append(...Object.entries(skills).map(([g, list]) => {
  const d = el("div", "skill", `<h3>${g}</h3>`), u = el("ul");
  list.forEach(s => {
    const li = el("li"), b = el("button", "", s); b.type = "button"; b.title = "Show projects using " + s;
    b.onclick = () => { state.tech = s; state.cat = "All"; renderProjects(); $("#projects").scrollIntoView({ behavior: "smooth" }); };
    li.append(b); u.append(li);
  });
  d.append(u); return d;
}));
$("#certList").append(...certs.map(([n, by]) => el("li", "", `<strong>${n}</strong><span>${by}</span>`)));
renderProjects();
$("#year").textContent = new Date().getFullYear();

// ===== Typing effect =====
const phrases = ["MERN stack apps", "NLP for education", "data science with Python", "REST APIs"];
const tEl = $("#typed");
if (matchMedia("(prefers-reduced-motion: reduce)").matches) tEl.textContent = phrases[0];
else { let i = 0, n = 0, del = false;
  (function tick() {
    const w = phrases[i]; tEl.textContent = w.slice(0, n);
    if (!del && n === w.length) { del = true; return setTimeout(tick, 1600); }
    if (del && n === 0) { del = false; i = (i + 1) % phrases.length; }
    n += del ? -1 : 1; setTimeout(tick, del ? 35 : 70);
  })(); }

// ===== Theme, progress bar, copy email =====
const root = document.documentElement;
let saved = null; try { saved = localStorage.getItem("theme"); } catch {}
const setTheme = t => { root.dataset.theme = t; const b = $("#themeBtn"); b.textContent = t === "dark" ? "☀" : "◐";
  b.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode"); try { localStorage.setItem("theme", t); } catch {} };
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("#themeBtn").onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");
addEventListener("scroll", () => { const h = root.scrollHeight - innerHeight; $("#progress").style.width = (h > 0 ? scrollY / h * 100 : 0) + "%"; }, { passive: true });
$("#copyEmail").onclick = async e => { const b = e.currentTarget;
  try { await navigator.clipboard.writeText(EMAIL); b.textContent = "Copied ✓"; } catch { b.textContent = EMAIL; }
  setTimeout(() => b.textContent = "Copy email", 2000); };

// ===== Mobile menu =====
const toggle = $("#menuToggle"), nav = $("#nav");
const setMenu = open => { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open); };
toggle.onclick = () => setMenu(!nav.classList.contains("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

// ===== Highlight current section in nav =====
const links = [...nav.querySelectorAll('a[href^="#"]')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(s => io.observe(s));

// ===== Contact form =====
$("#contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, status = $("#formStatus"), d = new FormData(f);
  if (!FORM_ENDPOINT) {
    const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + d.get("name"))}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app…";
    return;
  }
  status.textContent = "Sending…";
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", body: d, headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error();
    status.textContent = "Message sent. I’ll reply soon."; f.reset();
  } catch { status.textContent = "Could not send. Please email me directly at " + EMAIL; }
});
