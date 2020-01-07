import Delaunator from "delaunator";
import {
  BufferGeometry,
  Uint16BufferAttribute,
  Float32BufferAttribute,
  MeshPhongMaterial,
  DoubleSide,
  VertexColors
} from "three";

const angleUnit = (Math.PI * 2) / 90;
const geometry = new BufferGeometry();
const vertexArray = [];
const colorArray = [];

const generateTINGeometry = ({
  radius = 100,
  pointsCount = 500,
  borderMargin = 2,
  maxHeight = 15
} = {}) => {

  // create points along the circle
  for (let angle = 0.01; angle < Math.PI * 2; angle += angleUnit) {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    vertexArray.push(x, 0, y);

    colorArray.push(0.7, 0.9, 0.9);
  }

  // create random points inside the circle with radius R
  const R = radius - borderMargin;

  for (let i = 0; i < pointsCount; i++) {

    const x = -R + Math.random() * 2 * R;
    const maxY = Math.sqrt(R * R - x*x);
    const y = -maxY + Math.random() * 2 * maxY;
    const z = Math.random() * maxHeight;
    vertexArray.push(x, z, y);

    if (z < maxHeight/3) {
      colorArray.push(0.7, 0.9, 0.9);
    }
    else {
      colorArray.push(1, 1, 1);
    }
  }

  // Delaunator computes triangles in 2D
  const delaunayVertices = [];
  for (let i = 0; i < vertexArray.length; i +=3) {
    delaunayVertices.push([vertexArray[i], vertexArray[i + 2]]);
  }
  const delaunay = Delaunator.from(delaunayVertices);
  const indices = delaunay.triangles;

  geometry.setIndex(new Uint16BufferAttribute(indices, 1));
  geometry.setAttribute("position", new Float32BufferAttribute(vertexArray, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colorArray, 3));
  geometry.computeVertexNormals();

  return geometry;
}

const generateTINMaterial = ({
  smooth = true
} = {}) => {
  const material = new MeshPhongMaterial({
    side: DoubleSide,
    vertexColors: VertexColors,
    flatShading: !smooth
  });

  return material;
}

export { generateTINGeometry, generateTINMaterial }