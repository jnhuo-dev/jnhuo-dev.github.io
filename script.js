const projects = window.portfolioProjects || [];

const state = {
  filter: "all",
  selectedId: "jhslab-addin",
};

const selectors = {
  year: document.querySelector("#year"),
  navToggle: document.querySelector(".nav-toggle"),
  siteNav: document.querySelector("#site-nav"),
  filters: document.querySelector("#projectFilters"),
  featured: document.querySelector("#featuredProjects"),
  archive: document.querySelector("#archiveProjects"),
  empty: document.querySelector("#emptyProjects"),
  detail: document.querySelector("#projectDetail"),
};

const escapeHTML = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));

const joinTools = (tools = []) => tools.slice(0, 4).join(" · ");

const matchesFilter = (project) => state.filter === "all" || project.categorySlug === state.filter;

const getProject = (id) => projects.find((project) => project.id === id) || projects[0];

const renderMedia = (project, isDetail = false) => {
  const image = project.images?.[0];

  if (image) {
    return `
      <div class="${isDetail ? "detail-image" : "project-media"}">
        <img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt || project.title)}" loading="lazy">
      </div>
    `;
  }

  return `
    <div class="${isDetail ? "detail-image" : "project-media"}">
      <div class="project-placeholder">
        <div>
          <span>${escapeHTML(project.title)}</span>
          <small>Image will be added later</small>
        </div>
      </div>
    </div>
  `;
};

const renderCard = (project) => `
  <article class="project-card reveal ${project.id === state.selectedId ? "is-selected" : ""}" data-project-id="${escapeHTML(project.id)}">
    ${renderMedia(project)}
    <div class="project-body">
      <div class="project-meta">
        <span>${escapeHTML(project.category)}</span>
        <span>${escapeHTML(project.role)}</span>
      </div>
      <div>
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-summary">${escapeHTML(project.summary)}</p>
      </div>
      <p class="project-tools">${escapeHTML(joinTools(project.tools))}</p>
      <button class="detail-link" type="button" data-project-id="${escapeHTML(project.id)}">View detail</button>
    </div>
  </article>
`;

const renderProjectLists = () => {
  const featuredProjects = projects
    .filter((project) => project.group === "featured")
    .filter(matchesFilter)
    .sort((a, b) => a.order - b.order);

  const archiveProjects = projects
    .filter((project) => project.group === "archive")
    .filter(matchesFilter)
    .sort((a, b) => a.order - b.order);

  selectors.featured.innerHTML = featuredProjects.map(renderCard).join("");
  selectors.archive.innerHTML = archiveProjects.map(renderCard).join("");

  const hasProjects = featuredProjects.length + archiveProjects.length > 0;
  selectors.empty.hidden = hasProjects;

  observeReveals(document);
};

const renderDetail = (project) => {
  if (!project) return;

  const detailImages = project.images?.length
    ? project.images.map((image) => `
        <div class="detail-image">
          <img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt || project.title)}" loading="lazy">
        </div>
      `).join("")
    : [0, 1, 2].map(() => renderMedia(project, true)).join("");

  selectors.detail.innerHTML = `
    <article class="detail-shell reveal">
      <div class="detail-head">
        <div>
          <span class="section-kicker">${escapeHTML(project.category)}</span>
          <h2 id="detail-title">${escapeHTML(project.title)}</h2>
          <p class="detail-subtitle">${escapeHTML(project.subtitle)}</p>
        </div>
        <aside class="detail-facts" aria-label="프로젝트 요약">
          <div>
            <span class="fact-label">Role</span>
            <span class="fact-value">${escapeHTML(project.role)}</span>
          </div>
          <div>
            <span class="fact-label">Tools</span>
            <div class="detail-tags">
              ${project.tools.map((tool) => `<span>${escapeHTML(tool)}</span>`).join("")}
            </div>
          </div>
        </aside>
      </div>

      <div class="detail-content">
        <section class="detail-block">
          <h3>Overview</h3>
          <p>${escapeHTML(project.overview)}</p>
        </section>
        <section class="detail-block">
          <h3>Problem</h3>
          <p>${escapeHTML(project.problem)}</p>
        </section>
        <section class="detail-block">
          <h3>Solution</h3>
          <p>${escapeHTML(project.solution)}</p>
        </section>
        <section class="detail-block">
          <h3>My Contribution</h3>
          <p>${escapeHTML(project.contribution)}</p>
        </section>
        <section class="detail-block">
          <h3>Key Features</h3>
          <ul class="feature-list">
            ${project.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}
          </ul>
        </section>
        <section class="detail-block">
          <h3>Result / Impact</h3>
          <p>${escapeHTML(project.impact)}</p>
        </section>
      </div>

      <div class="detail-images" aria-label="프로젝트 이미지">
        ${detailImages}
      </div>
    </article>
  `;

  observeReveals(selectors.detail);
};

const observeReveals = (scope = document) => {
  const revealTargets = scope.querySelectorAll(".reveal:not(.reveal-visible)");

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("reveal-visible");
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealTargets.forEach((element) => observer.observe(element));
};

const setSelectedProject = (projectId, shouldScroll = true) => {
  state.selectedId = projectId;
  renderProjectLists();
  renderDetail(getProject(projectId));

  if (shouldScroll) {
    document.querySelector("#project-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

selectors.year.textContent = new Date().getFullYear();

selectors.navToggle?.addEventListener("click", () => {
  const isOpen = selectors.siteNav.classList.toggle("open");
  selectors.navToggle.setAttribute("aria-expanded", String(isOpen));
  selectors.navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  document.body.classList.toggle("menu-open", isOpen);
});

selectors.siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    selectors.siteNav.classList.remove("open");
    selectors.navToggle?.setAttribute("aria-expanded", "false");
    selectors.navToggle?.setAttribute("aria-label", "메뉴 열기");
    document.body.classList.remove("menu-open");
  });
});

selectors.filters?.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;

  state.filter = button.dataset.filter;
  selectors.filters.querySelectorAll(".filter-btn").forEach((filterButton) => {
    filterButton.classList.toggle("is-active", filterButton === button);
  });
  renderProjectLists();
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-project-id]");
  if (!detailButton || !detailButton.classList.contains("detail-link")) return;
  setSelectedProject(detailButton.dataset.projectId);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

renderProjectLists();
renderDetail(getProject(state.selectedId));
observeReveals(document);
