const logo = document.querySelector(".event-logo");
const tn = document.querySelector('#tn_logo');
const title = document.querySelector("#header-title");
const chess = document.querySelector('#chess_logo');

window.addEventListener("scroll", (e) => {
  let value = window.scrollY;
  if (window.innerWidth > 830) {
    if(tn){
      tn.style.left = `calc(60% + ${value * 1}px)`;
      title.style.margin = `${value * 0.25}px 0px 0px ${0 - value / 8}rem`;
    }else if(chess){
      chess.style.left = `calc(60% + ${value * 1}px)`;
      title.style.margin = `${value * 0.25}px 0px 0px ${0 - value / 8}rem`;
    }else{
      logo.style.left = `calc(45% + ${value * 1}px)`;
      title.style.margin = `${value * 0.25}px 0px 0px ${0 - value / 8}rem`;
    }

  }
});
