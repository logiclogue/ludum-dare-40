function GameState(player, boxes) {
    this.player = player;
    this.boxes = boxes;
}

GameState.prototype.setPlayer = function (person) {
    this.player = person;

    return this;
};

GameState.prototype.tick = function () {
    this.player = this.player.tick();

    return this;
};

module.exports = GameState;
