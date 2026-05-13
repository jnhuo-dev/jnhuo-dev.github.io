// 올해 연도
document.getElementById('year').textContent = new Date().getFullYear();

// 모바일 메뉴 토글
const navToggle = document.querySelector('.nav-toggle');
const siteNav   = document.querySelector('#site-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// 모바일 메뉴: 링크 클릭 시 닫기
siteNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// 스크롤 reveal 애니메이션
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.dataset.delay ?? 0;
      entry.target.style.transitionDelay = delay + 'ms';
      entry.target.classList.add('reveal--visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// 카드/타임라인에 stagger delay 부여
document.querySelectorAll('.projects-grid .reveal').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.timeline-item.reveal').forEach((el, i) => {
  el.dataset.delay = i * 100;
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 프로젝트 카테고리 필터
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// 부드러운 스크롤 (anchor)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
