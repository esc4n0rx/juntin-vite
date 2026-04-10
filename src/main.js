import './style.css'

// ── Nav scroll shadow ─────────────────────────────────────────────────────────
const nav = document.getElementById('nav')
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8)
  }, { passive: true })
}

// ── Hamburger menu ────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger')
const mobileNav = document.getElementById('mobile-nav')

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open')
  })

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'))
  })

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open')
    }
  })
}

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
  { threshold: 0.10, rootMargin: '0px 0px -32px 0px' }
)

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

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
