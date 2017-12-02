var GameState = require("./GameState");

require("./toThreeJs");

function ThreeJsState(camera, meshes, browserState) {
    this.camera = camera;
    this.meshes = meshes;
    this.renderer = new THREE.WebGLRenderer();
    this.width = browserState.width;
    this.height = browserState.height;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
}

GameState.prototype.toThreeJsState = function (browserState) {
    return new ThreeJsState(
        this.player.toCamera(),
        this.boxes.toMesh(),
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

module.exports = ThreeJsState;
