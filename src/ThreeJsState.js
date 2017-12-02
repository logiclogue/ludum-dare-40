var GameState = require("./GameState");
var _ = require("lodash");

require("./toThreeJs");

function ThreeJsState(camera, meshes, browserState) {
    this.camera = camera;
    this.meshes = meshes;
    this.scene = _.reduce(
        meshes,
        (scene, mesh) => scene.add(mesh),
        new THREE.Scene());
    this.width = browserState.width;
    this.height = browserState.height;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
}

GameState.prototype.toThreeJsState = function (browserState) {
    return new ThreeJsState(
        this.player.toCamera(),
        this.boxes.map(box => box.toMesh()),
        browserState
    );
};

ThreeJsState.prototype.resize = function (browserState) {
    return new ThreeJsState(
        this.camera,
        this.meshes,
        browserState
    );
};

ThreeJsState.prototype.render = function (renderer) {
    console.log(this.scene);
    console.log(this.camera);
    renderer.render(this.scene, this.camera);
};

module.exports = ThreeJsState;
