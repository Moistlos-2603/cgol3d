
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020)
const camera = new THREE.PerspectiveCamera(65, window.innerWidth/ window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );