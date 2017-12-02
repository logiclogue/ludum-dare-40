var Bacon = require("baconjs");
var Grass = require("./Grass");

console.log(new Grass(1, 2));

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var geometry = new THREE.BoxGeometry(1, 1, 1);

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.1;
    mesh.position.z -= 0.1;

    renderer.render(scene, camera);
}

console.log("Hello, World!!!");

var material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener(\resize, resize, false);

updateStream = Bacon.interval(1000, "test");
animationStream = Bacon.fromBinder((sink) => {
    function f() {
        requestAnimationFrame(f);
        animate();
        sink("animate");
    }

    f();
});

updateStream.onValue();
animationStream.onValue();
