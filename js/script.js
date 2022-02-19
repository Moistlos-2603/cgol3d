
import * as THREE from '../modules/three.module.js';

import { OrbitControls } from '../modules/OrbitControls.js';
export function setup(){

// set up Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020)

// Set up Camera
const camera = new THREE.PerspectiveCamera(65, window.innerWidth/ window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


camera.position.z = 5;

const orbitControls = new OrbitControls(camera, renderer.domElement) 
function animitaion(){
    requestAnimationFrame(animitaion)

    orbitControls.update(0.5)

    renderer.render(scene, camera)
}
animitaion()

}