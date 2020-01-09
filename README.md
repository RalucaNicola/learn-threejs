# Learning ThreeJS with a fun project

This repo contains a side project that I used to learn more 3D concepts and play with ThreeJS. The project that I worked on is 🎉 a penguin in a globe 🎉

[![Penguin in a globe](https://thepracticaldev.s3.amazonaws.com/i/a7fgnbmkg9crbtvw5272.png)](https://raluca-nicola.net/learn-threejs/)

To run this app locally:
```cli
git clone https://github.com/RalucaNicola/learn-threejs.git
npm install
npm run dev
```

Below you can read about the workflow for this project.

## Resources to start learning

I started learning by checking out documentation, blog posts, video tutorials etc. There are many resources out there, so I'll just write the ones that worked really well for me and you might want to check them out (with the disclaimer that they might not work as well for you):

 * I really enjoyed going through the Getting started section of Lewy Blue's book [Discover ThreeJS](https://discoverthreejs.com/book/contents/). Only the first 2 sections are available for now, but it's enough to give you a kick start in the ThreeJS universe.
 * If you're more into video tutorials, then CJGammon has an [Introductory series on youtube](https://www.youtube.com/watch?v=ABV1mK1CGOY&list=PUFbkyvvsEQn7AmQO6_G5J-A).
 * For explanations on 3D concepts I mostly go to the [Real-Time Rendering](https://www.realtimerendering.com/) book.
 * I wanted to understand how shaders work and write my first shader (be it a dead easy one). It's quite hard to find resources on this topic for beginners... However, I really liked:
     * Surma's Supercharged episode about [WebGL shaders for image processing](https://www.youtube.com/watch?v=_ZQOUQsw_YI)
     * Matt DesLauriers' [Creative coding with WebGL and shaders workshop](https://frontendmasters.com/workshops/more-creative-coding/) on Frontend Masters (this is only available with a paid subscription, but it was really worth it for me). The repo with resources is public on [Github](https://github.com/mattdesl/workshop-webgl-glsl/).

When actually starting the project, the best resources turned out to be the [ThreeJS official documentation](https://threejs.org/docs/index.html#api/en/scenes/Scene) and their [example apps](https://threejs.org/examples/).

## Set up the repo and the app

I wanted to have a simple setup where I could write ES6 JavaScript. Webpack always comes with a ton of configuration which is really useful for big projects, but when all you want to do is put a penguin in a globe, it's so much better if you don't need a ton of configuration. So I tried for the first time [Parcel](https://parceljs.org/) and it was exactly the right tool for the job. It comes with a built-in Babel compiler, so all I needed to do was:

```
// setup the package.json file
npm init -y

// install parcel
npm install --save-dev parcel-bundler

```

Then I added the two script commands for building the project in the `package.json` file:

```js
"scripts": {
  "dev": "parcel index.html",
  "build": "parcel build index.html"
},
```

I installed threejs as well and then I was good to go:

```
npm install --save three
```

You can check out the initial stage of the project [here](https://github.com/RalucaNicola/learn-threejs/commit/d007d5c311363e5f7bda404a74985bec2357b643).

## Setup the scene

There are a few basic elements that you need to define, whenever you want to create a new scene: the scene itself, the camera, the lights and the renderer. I added the axes helpers to better orient myself while developing and I also added the [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) for navigation. You can read about all of these in detail with some great examples in the [Discover ThreeJS book](https://discoverthreejs.com/).
If you want to have a look at all the setup code, you can find it in this [commit](https://github.com/RalucaNicola/learn-threejs/commit/16246ab0605904673ba1410961cc9abe9c70a5dd).

## Create a triangulated irregular network

I want to create a triangulated surface that looks a bit like low-poly terrain covered with snow. The workflow is the following:
 * I start with a bunch of random points and then I connect them creating triangles. A fast and good library that I've used for this is called [Delaunator](https://github.com/mapbox/delaunator).
 * For each of the created vertices I generate a random z value and i also assign a color based on the height of the vertex. High values are white and lower values are blue.
 * I then create the geometry by assigning the vertex position and color to the geometry. I also set the triangle face indices that are returned by the Delaunator library.
 * In the end I create the material, telling it to take the colors from the vertices and setting the shading to be flat. This gives the low-poly aspect to the terrain.

You can find the code in this [commit](https://github.com/RalucaNicola/learn-threejs/commit/0b3633e12e510ccefa60c317cad7a4b05fdb20fd). And this is what the terrain looks like in the end:
![low poly terrain](https://thepracticaldev.s3.amazonaws.com/i/bzxh1zlkupt5v4moxg7t.png)


## Adding a glass globe

For this part I used the code from a ThreeJS [example of spheres with transparency](https://threejs.org/examples/#webgl_materials_physical_transparency). The most interesting part here is exploring different types of materials and playing with properties like roughness, metalness, clearcoat or reflectivity to simulate a reflective glass surface. I also learned about [cube map textures](https://learnopengl.com/Advanced-OpenGL/Cubemaps) that can be used as an [environment map](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial.envMap). I used [this abstract image](https://unsplash.com/photos/ruJm3dBXCqw) as an environment map for the globe because it gives this bubble soap effect and the colors also match the background. I created the cube map textures using [this online tool](https://jaxry.github.io/panorama-to-cubemap/).


![adding a glass globe](https://thepracticaldev.s3.amazonaws.com/i/kv21xkrtzuntq3zonm4y.png)

The commit for this step is [here](https://github.com/RalucaNicola/learn-threejs/commit/c6beac3cc960a63c7c13f723726cdeb067b03708).

## Adding Peppermint the pengu

I can't create my own 3D models (still something on my to-learn list). So I always search for models online. Two websites that I constantly go to are Google Poly and Sketchfab. They have a built-in converted that will let you download the models in a GLTF format. I found Peppermint on [Google Poly](https://poly.google.com/view/dLdYN_-2dlE) under a CC-BY license.

![Peppermint](https://thepracticaldev.s3.amazonaws.com/i/ohbpz0sgs0jy3b6joy1a.png)

Otherwise, there's not much to add at this step. In the ThreeJS book there is a dedicated section on [how to import external models](https://discoverthreejs.com/book/first-steps/load-models/). Or just have a look at [my code](https://github.com/RalucaNicola/learn-threejs/commit/83b893625f09c7dadabdb59d458e2b32291e5a5a).

## Add a support for the globe

Finally I added the support, which is not more than a cylinder shape with different radiuses for top and bottom. The exciting part in this step is that I played a bit with shaders and created that gradient for the material. [Creating a custom shader in threejs](https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi) is a blog post that shows exactly how to create a fragment shader that displays a gradient between 2 colors.

And that was about it. You can check out the live version here: https://raluca-nicola.net/learn-threejs/. Also the repository for the project is here: https://github.com/RalucaNicola/learn-threejs.

This project was a really nice way to learn new technologies, 3D concepts and play around with tools and I hope it will inspire you to also build something or learn something new.