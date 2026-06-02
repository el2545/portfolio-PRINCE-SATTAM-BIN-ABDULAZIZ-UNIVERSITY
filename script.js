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

function setActiveLink(hash) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

menuButton.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
navLinks.forEach((link) => link.addEventListener("click", () => {
  setActiveLink(link.getAttribute("href"));
  setMenu(false);
}));

function updateActiveFromScroll() {
  const offset = 120;
  const hashTarget = location.hash ? document.querySelector(location.hash) : null;
  const hashRect = hashTarget?.getBoundingClientRect();
  const current = hashRect && hashRect.top >= -40 && hashRect.top <= window.innerHeight * 0.35
    ? hashTarget
    : [...sections]
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= offset);
  if (current) setActiveLink(`#${current.id}`);
}

function syncActiveState() {
  if (location.hash && document.querySelector(location.hash)) setActiveLink(location.hash);
  else updateActiveFromScroll();
}

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateActiveFromScroll();
    scrollTicking = false;
  });
});

window.addEventListener("resize", updateActiveFromScroll);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("hashchange", syncActiveState);
if (location.hash) setActiveLink(location.hash);
window.setTimeout(syncActiveState, 100);
window.setTimeout(syncActiveState, 750);
window.setTimeout(syncActiveState, 2200);
window.addEventListener("load", () => {
  syncActiveState();
  window.setTimeout(syncActiveState, 250);
  window.setTimeout(syncActiveState, 1500);
  let syncCount = 0;
  const syncTimer = window.setInterval(() => {
    syncActiveState();
    syncCount += 1;
    if (syncCount >= 8) window.clearInterval(syncTimer);
  }, 500);
});
