const logo = document.querySelector(".event-logo");
const title = document.querySelector("#header-title");

window.addEventListener("scroll", (e) => {
  let value = window.scrollY;
  if (window.innerWidth > 830) {
    logo.style.left = `calc(45% + ${value * 1}px)`;
    title.style.margin = `${value * 0.25}px 0px 0px ${0 - value / 8}rem`;
  }
});
