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
}

GameState.prototype.toThreeJsState = function (browserState) {
    if (!this._threeJsState) {
        this._threeJsState = new ThreeJsState(
            this.player.toCamera(browserState),
            this.boxes.map(box => box.toMesh()),
            browserState
        );
    }

    this._threeJsState.camera = this.player.toCamera(browserState);
    this._threeJsState.browserState = browserState;

    return this._threeJsState;
};

ThreeJsState.prototype.resize = function (browserState) {
    this.width = browserState.width;
    this.height = browserState.height;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    return this;
};

ThreeJsState.prototype.render = function (renderer) {
    renderer.render(this.scene, this.camera);
};

module.exports = ThreeJsState;
