import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from "gsap";
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load('/moon_texture.jpg');

const rotateBtn = document.getElementById('rotateBtn');
const lightBtn = document.getElementById('lightBtn');


let isLightRotating = false;

const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
 map: moonTexture,
})

const rotateButton = document.querySelector('nav li:nth-child(2)');
rotateButton.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  controls.update();
});

const lightButton = document.querySelector('nav li:nth-child(3)');
lightButton.addEventListener('click', () => {
  isLightRotating = !isLightRotating;
  if (isLightRotating) {
    rotateLight();
  }
});

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
width: window.innerWidth,
height: window.innerHeight,
}

const light = new THREE.PointLight(0xfffffffff, 1000, 100);
light.position.set( 0, 20, 20 );
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100 )
camera.position.z = 20
scene.add(camera)


const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(5)
renderer.render(scene,camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 2;


window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});


const rotateLight = () => {
  if (isLightRotating) {
    const time = Date.now() * 0.001;
    light.position.x = Math.sin(time) * 20;
    light.position.z = Math.cos(time) * 20;
    requestAnimationFrame(rotateLight);
  }
};
const loop = () => {
  controls.update();
  rotateLight();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};


loop();
const t1 = gsap.timeline({ defaults: { duration: 3}})
t1.fromTo(mesh.scale, { z: 0, x: 0,y: 0}, {z:1, x: 1,y:1})
t1.fromTo("nav", {y: "-100%"}, {y: "0%"})
t1.fromTo(".title", {opacity: 0}, {opacity: 1})