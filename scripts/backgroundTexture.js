/************************************************
 *
 * Creates a background texture for the scene with snowflakes.
 * The texture displays a radial gradient and the snowflakes are on
 * an irregular grid.
 *
 * Credits to GeekLaunch for the code for creating the snow flakes:
 * https://github.com/GeekLaunch/snowflake-generator/blob/master/snowflake-generator.js
 *
 ***********************************************/

import { NearestFilter, CanvasTexture } from "three";

const branches = 2, maxLevel = 3;

const drawLine = (level, flake, context, angle) => {
  if (level > maxLevel) return;
  context.strokeStyle = 'white';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(flake.r, 0);
  context.stroke();

  for (let i = 1; i < branches + 1; i++) {
    context.save();

    context.translate(flake.r * i / (branches + 1), 0);
    context.scale(0.5, 0.5);
    context.save();

    context.rotate(angle);
    drawLine(level + 1, flake, context);
    context.restore();
    context.save();

    context.rotate(-angle);
    drawLine(level + 1, flake, context);
    context.restore();
    context.restore();
  }
}

const drawSnowFlake = (context, flake) => {
  context.translate(flake.x, flake.y);
  const angle = Math.PI + Math.PI * Math.random();
  for (let i = 0; i < 6; i++) {
    drawLine(0, flake, context, angle);
    context.rotate(Math.PI * 2 / 6);
  }
}

const getBackgroundCanvas = (width, height) => {

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(512, 512, 10, 512, 512, 1024);
  gradient.addColorStop(0, '#cbcef1');
  gradient.addColorStop(.25, '#dcc8e1');
  gradient.addColorStop(.75, '#ccc0f2');
  gradient.addColorStop(1, '#d2e6f1');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < width; i += 200) {
    for (let j = 0; j < height; j += 200) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      drawSnowFlake(context, {
        x: i - 100 + Math.random() * 100,
        y: j - 100 + Math.random() * 100,
        r: 5 + Math.random() * 50
      });
    }
  }
  return canvas;
}

const getTexture = (width, height) => {

  const canvas2D = getBackgroundCanvas(width, height);

  const bgTexture = new CanvasTexture(canvas2D);
  bgTexture.magFilter = NearestFilter;

  return bgTexture;
}

export { getTexture }