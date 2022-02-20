
import * as THREE from '../modules/three.module.js';
import { OrbitControls } from '../modules/OrbitControls.js';

import { arraytoblock } from './arraytoblock.js';

export function setup(){

    // set up Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020)

    // Set up Camera
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth/ window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Renderer und Canvas
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    function addcube(x, y, z){
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = x
        cube.position.y = y
        cube.position.z = z
        cube.scale.x = 0.8
        cube.scale.y = 0.8
        cube.scale.z = 0.8

        console.log(cube)
        scene.add( cube );
    }




    const orbitControls = new OrbitControls(camera, renderer.domElement) 
    function animitaion(){
        requestAnimationFrame(animitaion)

        orbitControls.update(0.5)

        renderer.render(scene, camera)
    }
    animitaion()




  
 

    arraytoblock()

}