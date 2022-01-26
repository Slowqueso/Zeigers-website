import * as THREE from "../../js/build/three.module.js";

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
console.log(window.innerWidth / 10);
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
  console.log("rendering started");
  renderer.render(scene, camera);
  console.log("rendering ended");
};
console.log("width: " + window.innerWidth);
console.log("height: " + window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight + 100);
  renderer.render(scene, camera);
});
animate();

const navIcon = document.querySelector(".nav-icon");
const nav = document.querySelector("nav");

navIcon.onclick = function () {
  nav.classList.toggle("show");
};
var navbar = document.querySelector("nav");

window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.pageYOffset > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};
