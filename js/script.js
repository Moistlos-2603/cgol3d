
import * as THREE from '../modules/three.module.js';
import { OrbitControls } from '../modules/OrbitControls.js';

import { arraytoblock } from './arraytoblock.js';
import { update } from './update.js';
import { crate_board } from './crate_board.js';

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

    // Light
    const pointLight = new THREE.PointLight(0xfff)
    pointLight.position.x = 2
    pointLight.position.y = 2
    pointLight.position.z = 2
    scene.add(pointLight)

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({color: 0xfc03eb})
    function addcube(x, y, z){
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = x
        cube.position.y = y
        cube.position.z = z
        cube.scale.x = 0.8
        cube.scale.y = 0.8
        cube.scale.z = 0.8
        window.cube = cube
        scene.add( cube );
        window.cube = cube
    }
    
    
    addcube(0,0,0)


    const orbitControls = new OrbitControls(camera, renderer.domElement) 
    // Animationsloop 
    function animitaion(){
        requestAnimationFrame(animitaion)
        window.cube.rotation.x += 0.002
        window.cube.rotation.y += 0.002
        
        orbitControls.update()
        renderer.render(scene, camera)
    }
    animitaion()
    
    
    window.board = crate_board()

    window.board[4][5][6].alive = 1
    update(window.board)


  

    

}