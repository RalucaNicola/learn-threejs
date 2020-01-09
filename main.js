import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  PointLight,
  AxesHelper,
  Mesh
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as backgroundTexture from "./scripts/backgroundTexture";
import * as terrain from "./scripts/terrain";
import * as sphereGenerator from "./scripts/sphereGenerator";

const width = window.innerWidth;
const height = window.innerHeight;

// define scene
const scene = new Scene();
scene.background = backgroundTexture.getTexture(width, height);

// create camera and add a point light to it
const camera = new PerspectiveCamera(45, width / height, 1, 2000);
camera.position.set(-28.151, 269.558, -591.515);
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

// add the triangulated irregular network
const tinGeometry = terrain.generateTINGeometry({
  countPoints: 200,
  borderMargin: 10,
  maxHeight: 10
});
const tinMaterial = terrain.generateTINMaterial({ smooth: false });
const tinMesh = new Mesh(tinGeometry, tinMaterial);
scene.add(tinMesh);

// add the glass sphere
const glassSphere = sphereGenerator.createGlassSphere({
  position: [0, 65, 0],
  size: 120,
  transparency: 0.6
});
scene.add(glassSphere);

// add the GLTF model of a penguin
// Super awesome low poly penguin model by Damon Pidhajecky
// https://poly.google.com/view/dLdYN_-2dlE

const loader = new GLTFLoader();
loader.load('./models/peppermint/model.gltf', (gltf) => {
  const model = gltf.scene.children[0];
  model.position.set(0, 10, -10);
  model.scale.set(85, 85, 85);
  model.castShadow = true;
  scene.add(model);
}, null, (error) => {
  console.log(error);
});

// re-render the scene every frame
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();