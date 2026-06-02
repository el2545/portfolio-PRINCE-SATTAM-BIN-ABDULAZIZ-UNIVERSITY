const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];

function setMenu(open) {
  navMenu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
}

menuButton.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
  });
}, { rootMargin: "-28% 0px -55% 0px", threshold: [0.18, 0.35, 0.6] });

sections.forEach((section) => sectionObserver.observe(section));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
