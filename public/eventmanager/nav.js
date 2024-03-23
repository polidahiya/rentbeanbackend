let scrollvalue = 0;
document.addEventListener("scroll", () => {
  if (scrollvalue > window.scrollY) {
    document.querySelector("nav").classList.add("activenav");
  } else {
    document.querySelector("nav").classList.remove("activenav");
  }
  scrollvalue = window.scrollY;
});
