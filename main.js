import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xd3d3d3);
pointLight.position.set(6,6,6);

const ambientLight = new THREE.AmbientLight(0xC8CCFF);
scene.add(pointLight, ambientLight);


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

/* EARTH */

const earthTexture = new THREE.TextureLoader().load('earth.webp');

const earth = new THREE.Mesh(new THREE.SphereGeometry(1.2, 64, 32), new THREE.MeshBasicMaterial({ map: earthTexture }));
earth.position.z = -3.3;
earth.position.x = 1.1;
earth.position.y = 0.5;

earth.rotation.y = -1.7;
earth.rotation.x = 0.18;

scene.add(earth);
/*END  EARTH */


/* MOON */
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
moon.position.z = 1;
moon.position.x = -0.28;

scene.add(moon);

/* END MOON */




function getOrbitCoordinates(radius, angle) {
  let x = earth.position.x + radius * Math.cos(angle);
  let y = earth.position.y;
  let z = earth.position.z + radius * Math.sin(angle);
  return new THREE.Vector3(x, y, z);
}

function updateOrbit(moon, radius, angle) {
  let orbitCoordinates = getOrbitCoordinates(radius, angle);
  moon.position.set(orbitCoordinates.x, orbitCoordinates.y, orbitCoordinates.z);
}


function moveMoonArroundEarth(angle,radius) {
    updateOrbit(moon, radius, angle);
}
let angle = 0;
  let radius = 2.5;
setInterval(() => {
  
  moveMoonArroundEarth(angle,radius)
  angle += 0.01;

},20)



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;


   camera.position.z = 1;
   camera.position.x = 0;
   camera.rotation.y = -0.1;
}


function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.05;
  earth.rotation.y += 0.01;
  
  renderer.render(scene, camera);
 
  
}



moveCamera();
animate();
