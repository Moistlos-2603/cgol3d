import * as THREE from '../modules/three.module.js';
import { OrbitControls } from '../modules/OrbitControls.js';

import { update } from './update.js';
import { crate_board } from './crate_board.js';
//import { random } from './random.js';

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

   

    
    
    // Dat Gui
    const gui = new GUI.GUI()
    const lightFolder = gui.addFolder('Light')
    lightFolder.add(pointLight.position, 'x', -5, 30  )
    lightFolder.add(pointLight.position, 'y', -5, 30  )
    lightFolder.add(pointLight.position, 'z', -5, 30  )
    lightFolder.open()



    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({color: 0xfc03eb})
    function addcube(x, y, z){
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = x
        cube.position.y = y
        cube.position.z = -z 
        cube.scale.x = 0.8
        cube.scale.y = 0.8
        cube.scale.z = 0.8
        window.cube = cube
        scene.add( cube );
        window.cube = cube
    }



    // FPS eingabe
    function fpsinput(){
        window.fpsInterval = 1000/document.getElementById('fps')
    }

    // Das spiel läuft
    window.start = false

    // Board Size
    const board_size = 25;
    

    // Clear alles aus der Scene außer dem Licht(Index = 0)
    const clearThree = function (obj){
        while(obj.children.length > 2){ 
          clearThree(obj.children[2]);
          obj.remove(obj.children[2]);
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
        
       //linesetup(board_size)
    }  
    window.clearThree = clearThree


    // Zeigt alle Zelle an ensprechend dem Array 
    function arraytoblock(board, board_size){
        
       linesetup(board_size)
        for(var i = 0; i< board_size; i++){
            for(var j = 0; j < board_size; j++){
                for(var l = 0; l < board_size; l++){
                    if(board[i][j][l].alive == 1){
                        addcube(i-12, j-12, l-12)
                        
                    }
                }
            }
        }
    }
    window.arraytoblock = arraytoblock
    

    // OrbitControls 
    const orbitControls = new OrbitControls(camera, renderer.domElement) 
    
    
    var generation = 0;

    
    // Animationsloop 
    var stop = false;
    var frameCount = 0;
    var fps = 1
    var startTime, now, elapsed
    function startAnimation(fps){
        window.fpsInterval = 1000 / fps
        window.then = Date.now();
        startTime = window.then
        animate()
        animitaion()
    }
    window.generation = 0
    // Animiert die Blöcke(game Ticks)
    function animate(){
        requestAnimationFrame(animate)
        now = Date.now()
        elapsed = now - window.then;
        var boardzwei 
        var board = window.board
        //if(board.every((val, index) => val === b[index]))
        if(window.start == true){
            if(elapsed >  window.fpsInterval){
                then = now -(elapsed %  window.fpsInterval)
                clearThree(scene)
                arraytoblock(update(window.board, 5, 7, 6, 6), board_size)
                window.generation ++;
                document.getElementById('generation').innerHTML = ("Generation: " + window.generation)
                document.getElementById('bevoelkerung').innerHTML = ("Bevölkerung: " + anzahllebende(window.board, board_size))
            }
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
    

    window.addblock = function(){
        const x = parseInt(document.getElementById("x").value)
        const y = parseInt(document.getElementById("y").value)
        const z = parseInt(document.getElementById("z").value)

        if(!(x >= 0) || !(x <=24) || !Number.isInteger(x)){
        
            alert("Ein ungültiger wert wurde eingegeben. Gültige werte sind Natürliche Zahlen von 0 bis 24")
        }else if(!(y >= 0) || !(y <=24) || !Number.isInteger(y)){
        
            alert("Ein ungültiger wert wurde eingegeben. Gültige werte sind Natürliche Zahlen von 0 bis 24")
        }else if(!(z >= 0) || !(z <=24) || !Number.isInteger(z)){
        
            alert("Ein ungültiger wert eingegeben. Gültige werte sind Natürliche Zahlen von 0 bis 24")
        }else{

            if(window.board[x][y][z].alive != 1){
                window.board[x][y][z].alive = 1
            }else{
                window.board[x][y][z].alive = 0
            }
            
            arraytoblock(window.board, board_size)
        } 


    }
    
    
    window.board = crate_board(board_size)
    //window.board = random(window.board, board_size)
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

    // Ecken

    /*
    window.board[0][0][0].alive = 1
    window.board[0][0][24].alive = 1
    window.board[0][24][0].alive = 1
    window.board[0][24][24].alive = 1
    window.board[24][0][0].alive = 1
    window.board[24][0][24].alive = 1
    window.board[24][24][0].alive = 1
    window.board[24][24][24].alive = 1
    */


    // Mitte
    
    // window.board[12][12][12].alive = 1


    // 5, 7, 6, 6
    arraytoblock(window.board, board_size)
   

    window.linesetup = linesetup

 

}

function linesetup(board_size){// um rund um das Spielfeld Linien zu setzen
    const geometry = new THREE.BoxGeometry( board_size, board_size, board_size );
    
    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xff08ff } ) );
    
    scene.add( line );


}
