const sections = [...document.querySelectorAll('main section')];
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function setActive(id) {
  navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
  );
}

if (sections[0]) setActive(sections[0].id);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, {
  rootMargin: '-52px 0px -80% 0px',
  threshold: 0
});

sections.forEach(s => observer.observe(s));
