// 모바일 내비 토글
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#menu');
if (toggle && menu) {
toggle.addEventListener('click', () => {
const open = menu.classList.toggle('open');
toggle.setAttribute('aria-expanded', String(open));
});
}


// 다크모드 토글 (로컬스토리지 저장)
const themeBtn = document.getElementById('themeToggle');
const applyTheme = (mode) => {
document.documentElement.dataset.theme = mode; // 훗날 커스텀 테마에 활용 가능
localStorage.setItem('theme', mode);
};
if (themeBtn) {
const prefer = localStorage.getItem('theme');
if (prefer) applyTheme(prefer);
themeBtn.addEventListener('click', () => {
const next = (localStorage.getItem('theme') === 'dark') ? 'light' : 'dark';
applyTheme(next);
themeBtn.setAttribute('aria-pressed', String(next === 'dark'));
});
}


// 스크롤 리빌
const observer = new IntersectionObserver((entries) => {
for (const e of entries) {
if (e.isIntersecting) {
e.target.classList.add('is-visible');
observer.unobserve(e.target);
}
}
}, { threshold: 0.08 });


document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// 푸터 연도
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();