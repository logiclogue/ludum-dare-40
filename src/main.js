var Bacon = require("baconjs");
var Grass = require("./Grass");
var Player = require("./Player");
var Water = require("./Water");
var levels = require("../build/levels.json");
var _ = require("lodash");
var map2D = require("./map2D");
var BrowserState = require("./BrowserState");
var GameState = require("./GameState");
var ThreeJsState = require("./ThreeJsState");

var renderer = new THREE.WebGLRenderer();

(function () {
    document.body.appendChild(renderer.domElement);

    resize(BrowserState.create());

    var boxes = _(levels.sample)
        .map2D((value, x, y) => {
            if (value === 0x00FF00FF) {
                return new Grass(x, y);
            } else if (value === 0x0000FFFF) {
                return new Water(x, y);
            }
        })
        .flattenDeep()
        .value();
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
    var resizeStream = Bacon.fromEvent(window, "resize")
        .map(x => x.resize)
        .scan(renderer, () => BrowserState.create());
    var animationStream = Bacon.fromBinder((sink) => {
        function f() {
            requestAnimationFrame(f);
            sink();
        }

        f();
    });

    updateStream
        .merge(forwardStream)
        .merge(stopStream)
        .merge(rightStream)
        .merge(leftStream)
        .scan(gameState, (x, f) => f(x))
        //.sampledBy(animationStream)
        .map(game => game.toThreeJsState(BrowserState.create()))
        .sampledBy(Bacon.interval(1000))
        .onValue(three => three.render(renderer));

}());

function resize(browserState) {
    renderer.setPixelRatio(browserState.pixelRatio);
    renderer.setSize(browserState.width, browserState.height);
}
