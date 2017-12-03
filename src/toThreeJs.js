var Grass = require("./Grass");
var Water = require("./Water");
var Player = require("./Player");

Grass.prototype.toMesh = function () {
    var geometry, material;

    if (!this._mesh) {
        geometry = new THREE.PlaneGeometry(1, 1, 1);
        material = new THREE.MeshBasicMaterial({
            color: 0x00FF00
        });
        this._mesh = new THREE.Mesh(geometry, material);
    }

    this._mesh.position.x = this.x;
    this._mesh.position.z = this.y;
    this._mesh.rotation.x = -Math.PI / 2;

    return this._mesh;
};

Water.prototype.toMesh = function () {
    var geometry, material;
    
    if (!this._mesh) {
        geometry = new THREE.PlaneGeometry(1, 1, 1);
        material = new THREE.MeshBasicMaterial({
            color: 0x0000FF
        });
        this._mesh = new THREE.Mesh(geometry, material);
    }

    this._mesh.position.x = this.x;
    this._mesh.position.y = -0.5;
    this._mesh.position.z = this.y;
    this._mesh.rotation.x = -Math.PI / 2;

    return this._mesh;
};

Player.prototype.toCamera = function (browserState) {
    if (!this._camera) {
        this._camera = new THREE.PerspectiveCamera(
            75,
            browserState.width / browserState.height,
            0.1,
            1000);
    }

    this._camera.position.y = 2;
    this._camera.position.x = this.x;
    this._camera.position.z = this.y;
    this._camera.rotation.y = -this.direction;

    return this._camera;
};
