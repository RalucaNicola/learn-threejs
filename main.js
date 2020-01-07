import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  PointLight,
  AxesHelper
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getTexture } from "./scripts/backgroundTexture";

const width = window.innerWidth;
const height = window.innerHeight;

// define scene
const scene = new Scene();
scene.background = getTexture(width, height);

// create camera and add a point light to it
const camera = new PerspectiveCamera(45, width / height, 1, 2000);
camera.position.set(10, 10, 10);
camera.lookAt(scene);

const pointLight = new PointLight(0xffffff, 0.6);
camera.add(pointLight);
scene.add(camera);

// add axes for debugging purposes
var axisHelper = new AxesHelper( 2 );
scene.add( axisHelper );

// create ambientLight and more point lights
const ambientLight = new AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);

for (let i = 0; i < 10; i++) {
  let pointLight = new PointLight(0xffffff, 0.05);
  pointLight.position.set(-1000 + Math.random() * 2000, 500, -1000 + Math.random() * 2000);
  scene.add(pointLight);
}

// create the renderer
const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

// create the navigation controls
const controls = new OrbitControls(camera, renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();