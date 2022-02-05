var navbar = document.querySelector("nav");
window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.pageYOffset > 50) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("show");
  } else {
    navbar.classList.remove("scrolled");
  }

};
