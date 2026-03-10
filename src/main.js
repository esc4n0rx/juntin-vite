import './style.css'

// ── Theme toggle ──────────────────────────────────────────────────────────────
const root = document.documentElement
const themeBtn = document.getElementById('theme-toggle')
const themeIcon = document.getElementById('theme-icon')

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme)
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙'
  localStorage.setItem('juntin-theme', theme)
}

// Init theme
const saved = localStorage.getItem('juntin-theme')
applyTheme(saved || getSystemTheme())

themeBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme')
  applyTheme(current === 'dark' ? 'light' : 'dark')
})

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('juntin-theme')) {
    applyTheme(e.matches ? 'dark' : 'light')
  }
})

// ── Scroll reveal ─────────────────────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// ── Nav scroll shadow ─────────────────────────────────────────────────────────
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    nav.style.boxShadow = '0 1px 0 var(--border), 0 4px 20px rgba(31, 42, 68, 0.12)'
  } else {
    nav.style.boxShadow = '0 1px 0 var(--border), 0 4px 12px rgba(31, 42, 68, 0.06)'
  }
}, { passive: true })

// ── Counter animation ─────────────────────────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1200) {
  let start = 0
  const step = target / (duration / 16)
  const update = () => {
    start = Math.min(start + step, target)
    el.textContent = Math.floor(start).toLocaleString('pt-BR') + suffix
    if (start < target) requestAnimationFrame(update)
  }
  update()
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseInt(el.dataset.target)
        const suffix = el.dataset.suffix || ''
        animateCounter(el, target, suffix)
        statsObserver.unobserve(el)
      }
    })
  },
  { threshold: 0.5 }
)

document.querySelectorAll('.counter').forEach(el => statsObserver.observe(el))

// ── Balance visibility toggle in phone mockup ─────────────────────────────────
const eyeBtn = document.getElementById('eye-toggle')
const balanceEl = document.getElementById('mockup-balance')
let balanceVisible = true

if (eyeBtn && balanceEl) {
  eyeBtn.addEventListener('click', () => {
    balanceVisible = !balanceVisible
    balanceEl.textContent = balanceVisible ? 'R$ 4.280,50' : 'R$ ••••••'
    eyeBtn.textContent = balanceVisible ? '👁' : '🙈'
  })
}
