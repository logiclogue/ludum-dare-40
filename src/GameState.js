var _ = require("lodash");

function GameState(player, boxes) {
    this.player = player;
    this.boxes = boxes;
    this.removed = [];
}

GameState.prototype.setPlayer = function (person) {
    this.player = person;

    return this;
};

GameState.prototype.removeBox = function (box) {
    box.removed = true;

    return this;
};

GameState.prototype.updateState = function () {
    this.player = this.player.updateState();
    this.removed = _(this.boxes)
        .filter(box => box.removed)
        .value();
    this.boxes = _(this.boxes)
        .filter(box => !box.removed)
        .value();

    return this.player.updateGameState(this);
};

module.exports = GameState;
