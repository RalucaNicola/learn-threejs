import { Color, ShaderMaterial, CylinderGeometry, Mesh } from "three";

const vertexShader = /* glsl */ `
varying vec2 vUv;

void main () {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
}
`;

const fragmentShader = /* glsl */ `
varying vec2 vUv;
vec3 fragColor;
uniform vec3 color;

void main () {
  float dist = sin(vUv.y);
  vec3 fragColor = mix(vec3(1, 1, 1), color, dist);
  gl_FragColor = vec4(fragColor, 1.0);
}
`;

const createSupportCylinder = ({
  color = new Color("#aaa")
} = {}) => {

  if (!(color instanceof Color)) {
    const value = color;
    if ((typeof value == "number") || (typeof value === "string")) {
      color = new Color(value);
    }
  }

  const cylinderMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      color:{
        value: color
      }
    }
  });

  const cylinderGeometry = new CylinderGeometry(100, 120, 55, 64);
  const supportCylinder = new Mesh(cylinderGeometry, cylinderMaterial);
  supportCylinder.position.set(0, -28, 0);
  return supportCylinder;
}

export { createSupportCylinder }