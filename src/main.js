var Bacon = require("baconjs");
var Grass = require("./Grass");
var Water = require("./Water");
var levels = require("../build/levels.json");
var _ = require("lodash");

require("lodash-helpers");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);

camera.position.y = 1;

var renderer = new THREE.WebGLRenderer();

Grass.prototype.toMesh = function () {
    var geometry = new THREE.PlaneGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00FF00
    });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = this.x;
    mesh.position.z = this.y;
    mesh.rotation.x = -Math.PI / 2;

    return mesh;
};

Water.prototype.toMesh = function () {
    var geometry = new THREE.PlaneGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000FF
    });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = this.x;
    mesh.position.y = -0.5;
    mesh.position.z = this.y;
    mesh.rotation.x = -Math.PI / 2;

    return mesh;
};

(function () {
    var grass = new Grass(-5, 0);

    _.range(-5, 5).forEach(x =>
        _.range(-5, 5).forEach(y =>
            scene.add(new Water(x, y).toMesh())));
    console.log(levels.sample);

    _.map2D(levels.sample, (value, x, y) => {

    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", resize, false);

    updateStream = Bacon.interval(50, "test").onValue(update);
    animationStream = Bacon.fromBinder((sink) => {
        function f() {
            requestAnimationFrame(f);
            animate();
            sink("animate");
        }

        f();
    }).onValue();
}());

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update() {

}

function animate() {
    renderer.render(scene, camera);
}
