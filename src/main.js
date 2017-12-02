var Bacon = require("baconjs");
var Grass = require("./Grass");
var Water = require("./Water");
var levels = require("../build/levels.json");
var _ = require("lodash");
var map2D = require("./map2D");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);

camera.position.y = 2;
camera.position.x = 10;
camera.position.z = 10;

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
    _(levels.sample)
        .map2D((value, x, y) => {
            if (value === 0x00FF00FF) {
                return new Grass(x, y);
            } else if (value === 0x0000FFFF) {
                return new Water(x, y);
            }
        })
        .flattenDeep()
        .forEach(value => {
            scene.add(value.toMesh());
        });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", resize, false);

    var updateStream = Bacon.interval(50, "test").onValue(update);
    var animationStream = Bacon.fromBinder((sink) => {
        function f() {
            requestAnimationFrame(f);
            animate();
            sink("animate");
        }

        f();
    }).onValue();
    var keyStream = Bacon.fromEvent(document.body, "keydown")
        .map(x => x.key);

    keyStream.filter(key => key === "w").onValue(() => camera.position.z += 1);
    keyStream.filter(key => key === "s").onValue(() => camera.position.z -= 1);
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
