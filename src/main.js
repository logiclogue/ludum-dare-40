var Bacon = require("baconjs");
var Grass = require("./Grass");
var Player = require("./Player");
var Water = require("./Water");
var levels = require("../build/levels.json");
var _ = require("lodash");
var map2D = require("./map2D");
var BrowserState = require("./BrowserState");
var GameState = require("./GameState");

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

(function () {
    document.body.appendChild(renderer.domElement);

    var boxes = _(levels.sample)
        .map2D((value, x, y) => {
            if (value === 0x00FF00FF) {
                return new Grass(x, y);
            } else if (value === 0x0000FFFF) {
                return new Water(x, y);
            }
        })
        .flattenDeep();
    var player = Player.create();
    var gameState = new GameState(player, boxes);

    var updateStream = Bacon
        .interval(50, x => x.tick());

    var keydownStream = Bacon.fromEvent(document.body, "keydown");
    var keyupStream = Bacon.fromEvent(document.body, "keyup");

    var forwardStream = keydownStream
        .filter(x => x.key == "w")
        .map(() => game => game.setPlayer(game.player.setVelocity(0.1)));
    var stopStream = keyupStream
        .filter(x => x.key == "w")
        .map(() => game => game.setPlayer(game.player.setVelocity(0)));
    var rightStream = keydownStream
        .filter(x => x.key == "d")
        .map(() => game => game.setPlayer(game.player.moveRight(0.1)));
    var leftStream = keydownStream
        .filter(x => x.key == "a")
        .map(() => game => game.setPlayer(game.player.moveLeft(0.1)));

    updateStream
        .merge(forwardStream)
        .merge(stopStream)
        .merge(rightStream)
        .merge(leftStream)
        .scan(gameState, (x, f) => f(x))
        .sampledBy(Bacon.interval(1000))
        .log();

    var resizeStream = Bacon.fromEvent(window, "resize")
        .map(() => BrowserState.create());
    var animationStream = Bacon.fromBinder((sink) => {
        function f() {
            requestAnimationFrame(f);
            animate();
            sink("animate");
        }

        f();
    }).onValue();
}());

function animate() {
    //renderer.render(scene, camera);
}
