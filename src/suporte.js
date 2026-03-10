import './main.js'

window.toggleFaq = function (btn) {
  const item = btn.closest('.faq-item')
  const isOpen = item.classList.contains('open')
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'))
  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open')
}
