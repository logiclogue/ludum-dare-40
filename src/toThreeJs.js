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

Player.prototype.toCamera = function () {
    var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10);

    camera.position.y = 2;
    camera.position.x = this.x;
    camera.position.z = this.y;
    camera.rotation.y = this.direction;

    return camera;
};
