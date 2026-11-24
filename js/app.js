/* Roteador simples por hash: #/curriculo · #/cases · #/cases/<id> */
const S = window.SITE, C = window.CASES, app = document.getElementById("app");
const CATS = ["Produto", "Growth", "Dados", "Estratégia", "Monetização"];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const GEO = `<svg viewBox="0 0 400 400" fill="none" stroke="#4f86ff" stroke-width="1" aria-hidden="true"><circle cx="200" cy="200" r="190" opacity=".25"/><circle cx="200" cy="200" r="130" opacity=".35"/><circle cx="200" cy="200" r="70" opacity=".5"/><path d="M10 200h380M200 10v380M66 66l268 268M334 66L66 334" opacity=".18"/><rect x="130" y="130" width="140" height="140" rx="6" opacity=".4"/></svg>`;
const todo = v => (v && v.length) ? v : null;
const txt = v => v ? `<p>${esc(v)}</p>` : `<p class="todo">A preencher.</p>`;



function heroArt() {
  const bars = [60,95,80,130,110,165,140,190,170,225,200,250,225,280].map((v, i) => `<rect class="bar" style="animation-delay:${i * 90}ms" x="${60 + i * 78}" y="${520 - v}" width="38" height="${v}" rx="6"/>`).join("");
  const nodes = [[170,330],[330,270],[520,300],[690,190],[860,215],[1030,120],[1150,80]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="7" fill="#9bbcff"/><circle class="pulse" style="animation-delay:${i * 420}ms" cx="${x}" cy="${y}" r="18" stroke="#4f86ff" stroke-opacity=".7"/>`).join("");
  const P = "M0 400 C120 380 150 340 170 330 S300 290 330 270 S480 320 520 300 S650 210 690 190 S820 240 860 215 S990 140 1030 120 S1120 95 1150 80 L1200 70";
  return `<svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMin slice" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ha" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86ff" stop-opacity=".35"/><stop offset="1" stop-color="#4f86ff" stop-opacity="0"/></linearGradient>
      <linearGradient id="hb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f6bff" stop-opacity=".2"/><stop offset="1" stop-color="#9bbcff" stop-opacity=".9"/></linearGradient>
      <linearGradient id="hs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f86ff" stop-opacity="0"/><stop offset=".5" stop-color="#9bbcff" stop-opacity=".28"/><stop offset="1" stop-color="#4f86ff" stop-opacity="0"/></linearGradient>
      <radialGradient id="hg"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#7aa2ff" stop-opacity=".8"/><stop offset="1" stop-color="#2f6bff" stop-opacity="0"/></radialGradient>
    </defs>
    <g stroke="#4f86ff" stroke-opacity=".12">${[100,200,300,400,500].map(y => `<path d="M0 ${y}H1200"/>`).join("")}${[200,400,600,800,1000].map(x => `<path d="M${x} 0V600"/>`).join("")}</g>
    <rect class="sweep" x="-300" y="0" width="300" height="600" fill="url(#hs)"/>
    <g fill="#4f86ff" fill-opacity=".16">${bars}</g>
    <path d="${P} V600 H0Z" fill="url(#ha)"/>
    <path id="lp" class="ln" d="${P}" stroke="url(#hb)" stroke-width="3" stroke-linecap="round"/>
    ${nodes}
    <g class="trav"><circle r="26" fill="url(#hg)"><animateMotion dur="8s" begin="3s" repeatCount="indefinite"><mpath href="#lp"/></animateMotion></circle></g>
    <circle class="spin" cx="980" cy="330" r="170" stroke="#7aa2ff" stroke-opacity=".35" stroke-dasharray="3 12"/>
    <circle class="spin r" cx="980" cy="330" r="100" stroke="#4f86ff" stroke-opacity=".4" stroke-dasharray="40 14"/>
  </svg>`;
}

const ICONS = {
  alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  dados: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  growth: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  produto: '<path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5"/>',
  ia: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>'
};
function story() {
  const H = S.historia;
  const caps = H.capitulos.map(c => `
    <article class="chap rv">
      <div class="chap-h"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[c.icone]}</svg></span>
        <div><span class="cn">Capítulo ${c.n}</span><h3>${esc(c.titulo)}</h3><span class="ctag">${esc(c.tag)}</span></div></div>
      <div class="tags">${c.destaques.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      ${c.resultados ? `<div class="res">${c.resultados.map(r => `<div class="rs"><b>${esc(r.n)}</b><span>${esc(r.t)}</span></div>`).join("")}</div>` : ""}
      <p class="msg">${esc(c.msg)}</p>
    </article>`).join("");
  return `<section id="trajetoria"><div class="wrap"><h2>Minha trajetória em cinco capítulos</h2>
    <div class="story">${caps}</div>
    <div class="concl rv"><p class="cq">${esc(H.conclusao.frase)}</p><p class="muted">${esc(H.conclusao.complemento)}</p></div></div></section>`;
}

function curriculo() {
  const ex = S.experiencia.map((e, i) => `
    <article class="tl rv ${i === 0 ? "open" : ""}">
      <button aria-expanded="${i === 0}"><div class="eh">${e.logo ? `<img class="elogo${e.logoWide ? " wide" : ""}" src="${e.logo}" alt="">` : ""}<div><h3>${esc(e.empresa)}</h3><div class="cg">${esc(e.cargo)}</div></div></div><span class="per">${esc(e.periodo)}</span></button>
      <div class="body">${(e.cases || []).length ? `<div class="cchips">${e.cases.map(id => { const k = C.find(x => x.id === id); return k ? `<a class="chip casechip" href="${k.pdf}" target="_blank" rel="noopener">Case: ${esc(k.titulo)} →</a>` : ""; }).join("")}</div>` : ""}<ul class="list">${e.itens.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
    </article>`).join("");
  const tools = Object.entries(S.ferramentas).map(([k, v]) => `<div class="tgroup"><h4>${esc(k)}</h4><div class="tags">${v.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>`).join("");
  return `
  <section class="hero" id="capa"><div class="hero-art">${heroArt()}</div><div class="wrap hero-txt">
    <h1>${esc(S.nome.split(" ")[0])}<br>${esc(S.nome.split(" ").slice(1).join(" "))}</h1>
    <p class="cargo">${esc(S.cargo)}</p>
    <p class="story-title">${esc(S.historia.titulo)}</p>
    <p class="lead">${esc(S.historia.subtitulo)}</p>
    <div class="stats">${S.destaques.map(d => `<div><b>${esc(d.n)}</b><span>${esc(d.t)}</span></div>`).join("")}</div>
    <div class="chips"><span>Passagens por</span>${S.empresas.map(e => `<span class="chip">${esc(e)}</span>`).join("")}</div>
  </div></section>
  ${story()}
  <section id="resumo"><div class="wrap"><h2>Dados, produto e receita: uma trajetória orientada a resultado</h2><div class="cols">
    <div>${S.resumoLongo.map(p => `<p class="rv" style="margin-bottom:14px">${esc(p)}</p>`).join("")}<h3 style="margin:30px 0 14px">Especialidades</h3><ul class="list rv">${S.especialidades.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
    <div><h3 style="margin-bottom:14px">Diferenciais</h3><ul class="list rv">${S.diferenciais.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
  </div></div></section>
  <section id="experiencia"><div class="wrap"><h2>Onde gerei impacto: da análise à decisão de negócio</h2><div class="timeline">${ex}</div></div></section>
  <section id="competencias"><div class="wrap"><h2>Competências que transformam dados em crescimento</h2><div class="grid">${S.competencias.map(c => `<div class="card rv"><h4>${esc(c[0])}</h4><p>${esc(c[1])}</p></div>`).join("")}</div></div></section>
  <section id="ferramentas"><div class="wrap"><h2>O stack por trás de cada decisão estratégica</h2><div class="tools rv">${tools}</div></div></section>
  <section id="formacao"><div class="wrap"><h2>Formação acadêmica e idiomas</h2><div class="cols">
    <div class="grid" style="grid-template-columns:1fr">${S.formacao.map(f => `<div class="card rv"><h4>${esc(f.t)}</h4><p>${esc(f.i)}${f.s ? " · " + esc(f.s) : ""}</p></div>`).join("")}</div>
    <div class="grid" style="grid-template-columns:1fr">${S.idiomas.map(f => `<div class="card rv"><h4>${esc(f[0])}</h4><p>${esc(f[1])}</p></div>`).join("")}</div>
  </div></div></section>
  <section id="contato"><div class="wrap contact"><h2>Vamos conversar sobre crescimento?</h2>
    <a class="big" href="mailto:${S.email}">${esc(S.email)}</a>
    <div class="row"><a class="btn primary" href="mailto:${S.email}?subject=Contato%20pelo%20portf%C3%B3lio">Enviar e-mail</a><a class="btn" href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a class="btn" href="${S.pdf}" download>Baixar PDF</a></div>
  </div></section>`;
}

function card(c) {
  return `<a class="case mini rv" href="${c.pdf}" target="_blank" rel="noopener" aria-label="Acessar case ${esc(c.titulo)}">
    <h3>${esc(c.titulo)}</h3><span class="go">Acessar case <i>→</i></span></a>`;
}

function cases() {
  app.innerHTML = `<div class="wrap"><div class="page-head"><h1 style="font-size:clamp(34px,6vw,68px)">Cases de impacto em produto, growth e monetização</h1>
    <p>Projetos onde estratégia, dados e produto viraram resultado.</p></div>
    <div class="cases mini-grid" style="margin-top:34px">${C.map(card).join("")}</div></div>`;
}

function secao(t, body) { return `<div class="cd-sec"><h3>${t}</h3><div>${body}</div></div>`; }
function lista(a) { return todo(a) ? `<ul class="list">${a.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="todo">A preencher.</p>`; }
function midia(m) {
  if (!todo(m)) return `<p class="todo">Adicione imagens, gráficos, vídeos ou links em <code>js/data.js</code>.</p>`;
  return `<div class="media">${m.map(x => x.tipo === "video" ? `<figure><iframe src="${x.src}" allowfullscreen loading="lazy" title="${esc(x.legenda || "Vídeo")}"></iframe><figcaption>${esc(x.legenda || "")}</figcaption></figure>`
    : x.tipo === "link" ? `<a class="btn" href="${x.src}" target="_blank" rel="noopener">${esc(x.legenda || "Abrir link")}</a>`
    : `<figure><img src="${x.src}" alt="${esc(x.legenda || "")}" loading="lazy"><figcaption>${esc(x.legenda || "")}</figcaption></figure>`).join("")}</div>`;
}

function caseDetail(id) {
  const i = C.findIndex(c => c.id === id); if (i < 0) return location.hash = "#/cases";
  const c = C[i], p = C[i - 1], n = C[i + 1];
  app.innerHTML = `<div class="wrap"><a class="btn back" href="#/cases">Todos os cases</a>
    <div class="cd-hero"><span class="chip">${esc(c.categoria)}</span><h1>${esc(c.titulo)}</h1><p class="muted">${esc(c.descricao)}</p></div>
    ${c.pdf ? secao("Apresentação completa", `<div class="row" style="margin-bottom:16px"><a class="btn primary" href="${c.pdf}" target="_blank" rel="noopener">Abrir case completo (PDF)</a></div><div class="pdfwrap"><iframe src="${c.pdf.replace(/\/view.*$/, "/preview")}" title="${esc(c.titulo)}" loading="lazy" allow="fullscreen"></iframe></div>`) : ""}
    ${secao("Contexto do projeto", txt(c.contexto))}
    ${secao("Problema identificado", txt(c.problema || c.desafio))}
    ${secao("Oportunidade", txt(c.oportunidade))}
    ${secao("Estratégia adotada", txt(c.estrategia))}
    ${secao("Minha participação", txt(c.participacao))}
    ${secao("Solução desenvolvida", txt(c.solucao))}
    ${secao("Ferramentas utilizadas", todo(c.ferramentas) ? `<div class="tags">${c.ferramentas.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : '<p class="todo">A preencher.</p>')}
    ${secao("Indicadores e KPIs", lista(c.kpis))}
    ${secao("Resultados alcançados", lista(c.resultados))}
    ${secao("Aprendizados", txt(c.aprendizados))}
    ${secao("Imagens, gráficos e links", midia(c.media))}
    <div class="pn">${p ? `<a class="btn" href="#/cases/${p.id}">Anterior: ${esc(p.titulo)}</a>` : "<span></span>"}${n ? `<a class="btn" href="#/cases/${n.id}">Próximo: ${esc(n.titulo)}</a>` : ""}</div></div>`;
}

function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .12 });
  app.querySelectorAll(".rv").forEach((el, i) => { el.style.transitionDelay = Math.min((i % 6) * 70, 350) + "ms"; io.observe(el); });
}

function route() {
  const parts = (location.hash || "#/curriculo").replace("#/", "").split("/");
  const page = parts[0] || "curriculo";
  document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("on", a.dataset.route === page));
  if (page === "cases") parts[1] ? caseDetail(parts[1]) : cases();
  else {
    app.innerHTML = curriculo();
    app.querySelectorAll(".tl button").forEach(b => b.onclick = () => {
      const t = b.parentElement, o = t.classList.toggle("open"); b.setAttribute("aria-expanded", o);
    });
    app.querySelectorAll("[data-scroll]").forEach(b => b.onclick = () => document.getElementById(b.dataset.scroll).scrollIntoView({ behavior: "smooth" }));
  }
  window.scrollTo(0, 0); reveal(); closeMenu(); counters();
  document.title = page === "cases" ? "Cases — " + S.nome : S.nome + " — Produto, Growth e Monetização";
}


/* ---------- Efeitos ---------- */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches, fine = matchMedia("(hover: hover)").matches;
function counters() {
  if (calm) return;
  app.querySelectorAll(".stats b").forEach(el => {
    const m = el.textContent.match(/^(\D*)(\d+)(.*)$/); if (!m) return;
    const end = +m[2], t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1400, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = m[1] + v + m[3]; if (p < 1) requestAnimationFrame(step);
    })(t0);
  });
}
addEventListener("scroll", () => {
  const h = document.documentElement, max = h.scrollHeight - innerHeight;
  document.getElementById("prog").style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
  document.getElementById("nav").classList.toggle("scrolled", scrollY > 8);
}, { passive: true });
if (fine) {
  document.addEventListener("pointermove", e => {
    const t = e.target.closest && e.target.closest(".card,.case,.tl"); if (!t) return;
    const r = t.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    t.style.setProperty("--mx", x + "px"); t.style.setProperty("--my", y + "px");
    if (!calm && t.classList.contains("case"))
      t.style.transform = `perspective(900px) rotateX(${(-(y / r.height - .5) * 7).toFixed(2)}deg) rotateY(${((x / r.width - .5) * 7).toFixed(2)}deg) translateY(-4px)`;
  });
  document.addEventListener("pointerout", e => {
    const t = e.target.closest && e.target.closest(".case");
    if (t && !t.contains(e.relatedTarget)) t.style.transform = "";
  });
}

const burger = document.getElementById("burger"), menu = document.getElementById("menu");
function closeMenu() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
document.getElementById("lnk").href = S.linkedin;
document.getElementById("year").textContent = new Date().getFullYear();
window.addEventListener("hashchange", route);
route();
