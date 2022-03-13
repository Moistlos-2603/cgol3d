
import * as THREE from '../modules/three.module.js';
import { OrbitControls } from '../modules/OrbitControls.js';

import { update } from './update.js';
import { crate_board } from './crate_board.js';

import * as GUI from '../modules/dat.gui.module.js'

export function setup(){

    // set up Scene
    const scene = new THREE.Scene();
    window.scene = scene
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
    pointLight.position.x = 12.5
    pointLight.position.y = 30
    pointLight.position.z = 30
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

    // Dat Gui
    const gui = new GUI.GUI()
    const fpsFolder = gui.addFolder('Cube')
    //fpsFolder.add(fps, 'fps', 0.1 , 10)




    // Board Size
    const board_size = 25;
    
    
    // Convert
    function arraytoblock(board, board_size){
        clearThree(scene)
        for(var i = 0; i< board_size; i++){
            for(var j = 0; j < board_size; j++){
                for(var l = 0; l < board_size; l++){
                    if(board[i][j][l].alive == 1){
                        addcube(i-12.5,j-12.5,l-12.5)
                        
                    }
                }
            }
        }
    
        
    }

    // Clear alles aus der Scene außer dem Licht(Index = 0)
    function clearThree(obj){
        while(obj.children.length > 1){ 
          clearThree(obj.children[1]);
          obj.remove(obj.children[1]);
        }
        if(obj.geometry) obj.geometry.dispose();
      
        if(obj.material){ 
          //in case of map, bumpMap, normalMap, envMap ...
          Object.keys(obj.material).forEach(prop => {
            if(!obj.material[prop])
              return;
            if(obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function')                                  
              obj.material[prop].dispose();                                                      
          })
          obj.material.dispose();
        }
    }  
    

    // OrbitControls 
    const orbitControls = new OrbitControls(camera, renderer.domElement) 
    
    
    var generation = 0;

    
    // Animationsloop 
    var stop = false;
    var frameCount = 0;
    var fps = 1 
    var fpsInterval, startTime, now, then, elapsed
    function startAnimation(fps){
        fpsInterval = 1000 / fps
        then = Date.now();
        startTime = then
        animate()
        animitaion()
    }

    // Animiert die Blöcke(game Ticks)
    function animate(){
        requestAnimationFrame(animate)
        now = Date.now()
        elapsed = now - then;
        if(elapsed > fpsInterval){
            then = now -(elapsed % fpsInterval)
            arraytoblock(update(window.board, 5, 7, 6, 6), board_size)
            
            generation++;
            document.getElementById('generation').innerHTML = ("Generation: " + generation)
            document.getElementById('bevoelkerung').innerHTML = ("Bevölkerung: " + anzahllebende(window.board, board_size))

        }
    }
    
    // Zählt wie viele Zellen am Leben sind
    function anzahllebende(board, board_size){
        var lebende = 0
        for(var i = 0; i< board_size; i++){
            for(var j = 0; j < board_size; j++){
                for(var l = 0; l < board_size; l++){
                    if(board[i][j][l].alive == 1){
                        lebende++;
                    }
                }
            }
        }
        return lebende
    }


    // aktualiesiert scene und camera
    function animitaion(){
        orbitControls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(animitaion)
    }


    startAnimation(fps)
    


    
    
    window.board = crate_board(board_size)
    arraytoblock(window.board, board_size)


    // Glider
    
    window.board[3][24][4].alive = 1
    window.board[4][23][4].alive = 1
    window.board[4][22][4].alive = 1
    window.board[3][22][4].alive = 1
    window.board[2][22][4].alive = 1
    
    window.board[3][24][5].alive = 1
    window.board[4][23][5].alive = 1
    window.board[4][22][5].alive = 1
    window.board[3][22][5].alive = 1
    window.board[2][22][5].alive = 1
    

    // Balken
    /*
    window.board[3][3][4].alive = 1
    window.board[3][4][4].alive = 1
    window.board[3][5][4].alive = 1

    window.board[3][3][5].alive = 1
    window.board[3][4][5].alive = 1
    window.board[3][5][5].alive = 1
    */


    //update(window.board, 5, 7, 6, 6) // R = (5, 7, 6, 6)
    // 5, 7, 6, 6
    arraytoblock(window.board, board_size)
    
    arraytoblock(update(window.board, 5, 7, 6, 6), board_size)
    arraytoblock(update(window.board, 5, 7, 6, 6), board_size)
    arraytoblock(update(window.board, 5, 7, 6, 6), board_size);
   




}