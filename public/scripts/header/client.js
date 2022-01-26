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

document.body.appendChild(renderer.domElement);

// Geoemtry Render
const starGeometry = new THREE.BufferGeometry();

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const starVertices = [];
for (let i = 0; i <= 10000; i++) {
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
window.addEventListener("resize", () => {
  console.log("gay");
  renderer.setSize(window.innerWidth, window.innerHeight * 2 + 100);
  renderer.render(scene, camera);
});
animate();
