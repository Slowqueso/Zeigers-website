const joystick = document.querySelector("#joystick");
const consoleImg = document.querySelector("#console");

window.addEventListener("scroll", () => {
  let value = window.scrollY;
  // console.log(window.innerWidth);
  if (window.innerWidth > 830) {
    // joystick.style.left = `calc(60% + ${value / 190}%)`;
    // joystick.style.right = "0px !important";
    // joystick.style.transform = `translateY(calc(0% + ${
    //   value / 200
    // })%) rotateZ(${value / 200}deg)`;
    consoleImg.style.left = `calc(-10% + ${-value / 180}%)`;
  }
});
