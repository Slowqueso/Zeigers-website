import * as THREE from "../../js/build/three.module.js";

document.querySelector("body").addEventListener("load", () => {
  var scale = "scale(1)";
  document.body.style.webkitTransform = scale; // Chrome, Opera, Safari
  document.body.style.msTransform = scale; // IE 9
  document.body.style.transform = scale; // General
});
//Scene setup
const scene = new THREE.Scene();
const canvas = document.querySelector("canvas");

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

// Boilerplate Render
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight * 2 + 100);
// console.log(window.innerWidth / 10);
document.body.appendChild(renderer.domElement);

// Geoemtry Render
const starGeometry = new THREE.BufferGeometry();

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for (let i = 0; i <= 5000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);
camera.position.z = 15;
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
renderer.render(scene, camera);
// console.log("width: " + window.innerWidth);
// console.log("height: " + window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight * 2 + 100);
  renderer.render(scene, camera);
});
// animate();

const navIcon = document.querySelector(".nav-icon");
const nav = document.querySelector("nav");

navIcon.onclick = function () {
  nav.classList.toggle("show");
};

window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.pageYOffset > 50) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("show");
  } else {
    navbar.classList.remove("scrolled");
  }
};
var navbar = document.querySelector("nav");

const saturn = document.querySelector("#saturn");
const title1 = document.querySelector("#banner-title1");
const asteroid = document.getElementById("asteroid");
const banner2 = document.getElementById("banner-2");
const title2 = document.getElementById("banner-title2");
const desc1 = document.getElementById("banner-desc1");

if (window.innerWidth > 830) {
  document.querySelector("header").style.overflowY = "hidden";
} else if (window.innerWidth < 830) {
  document.querySelector("header").style.overflowY = "hidden";
}

window.addEventListener("scroll", (e) => {
  let value = window.scrollY;
  // console.log(value);
  if (window.innerWidth > 830) {
    saturn.style.left = `calc(45% + ${value * 0.5}px)`;
    title1.style.margin = `${value * 0.25}px 0px 0px ${0 - value / 8}rem`;
    asteroid.style.transform = `translateX(${-value * 0.5}px)  rotateZ(${
      (0 - value) / 15
    }deg)`;
    // if (value >= 200) {
      title2.style.transform = `translateX(${value / 12}px)`;
    // }
  } else if (window.innerWidth < 830 && window.innerWidth > 625) {
    saturn.style.left = `calc(45% + ${value * 0.2}px)`;
    title1.style.margin = `${value * 0.25}px 0px 0px ${0 - value / 8}rem`;
    asteroid.style.transform = `translateX(${-value * 0.5}px)  rotateZ(${
      (0 - value) / 15
    }deg)`;
    // if (value >= 200) {
      // title2.style.transform = `translateX(${value / 15}px)`;
    // }
  } else {
    saturn.style.left = `calc(66px + ${value * 2}px)`;
    title1.style.margin = `${value * 0.75}px 0px 0px ${0 - value / 12}rem`;
    asteroid.style.transform = `translateX(${-value / 5}px)  rotateZ(${(0 - value) / 10}deg)`;
    // if (value > 80) {
      // title2.style.left = `${value / 20}%`;
      // desc1.style.left = `${value / 20}%`;
    // }
  }
});
