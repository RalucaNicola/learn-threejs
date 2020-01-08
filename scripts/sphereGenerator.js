import {
  SphereGeometry,
  MeshPhysicalMaterial,
  Mesh,
  CubeTextureLoader,
  RGBFormat,
  NearestFilter
} from "three";

// Photo by Paweł Czerwiński on Unsplash
// https://unsplash.com/photos/ruJm3dBXCqw
// Converted to a cube map using https://jaxry.github.io/panorama-to-cubemap/

const path = "./";
const format = '.png';
const urls = [
  path + 'px' + format, path + 'nx' + format,
  path + 'py' + format, path + 'ny' + format,
  path + 'pz' + format, path + 'nz' + format
];

const glassTexture = new CubeTextureLoader().load(urls);
  glassTexture.format = RGBFormat;
  glassTexture.minFilter = NearestFilter;

const createGlassSphere = ({
  size = 100,
  transparency = 1,
  position = [0, 0, 0]
} = {}) => {
  const sphereGeometry = new SphereGeometry(size, 32, 64);
  const sphereMaterial = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    envMap: glassTexture,
    envMapIntensity: 1,
    depthTest: true,
    transparency: transparency,
    transparent: true
  });

  const sphere = new Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(...position);

  return sphere;
}

export { createGlassSphere }