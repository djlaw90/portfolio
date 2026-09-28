const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const contact = document.getElementById('contact');

// Solid header once the hero is scrolled past
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Mobile menu
const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navLinks.classList.toggle('is-open', open);
};
navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) setMenu(false);
});

// Scrollspy: highlight the nav link for the section in view
const spyLinks = new Map(
    [...navLinks.querySelectorAll('a[href^="#"]')].map((link) => [link.hash.slice(1), link])
);
const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        spyLinks.forEach((link, id) => link.classList.toggle('is-active', id === entry.target.id));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
['top', ...spyLinks.keys()].forEach((id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
});

// Contact dialog
const serviceSelect = contact.querySelector('select[name="service"]');
document.querySelectorAll('[data-open-contact]').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.dataset.service) serviceSelect.value = button.dataset.service;
        contact.showModal();
    });
});
contact.querySelector('[data-close-contact]').addEventListener('click', () => contact.close());
// close on backdrop click
contact.addEventListener('click', (event) => {
    if (event.target === contact) contact.close();
});
contact.querySelector('form').addEventListener('submit', () => {
    setTimeout(() => contact.close(), 0);
});

// Writing filters
const filters = document.querySelector('[data-filters]');
const filterCards = document.querySelectorAll('[data-filter-grid] [data-pub]');
filters.hidden = false;
filters.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-filter]');
    if (!chip) return;
    const filter = chip.dataset.filter;
    filters.querySelectorAll('[data-filter]').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    filterCards.forEach((card) => { card.hidden = filter !== 'all' && card.dataset.pub !== filter; });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
