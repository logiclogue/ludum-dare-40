function GameState(player, boxes) {
    this.player = player;
    this.boxes = boxes;
}

GameState.prototype.setPlayer = function (person) {
    this.player = person;

    return this;
};

GameState.prototype.updateState = function () {
    this.player = this.player.updateState();

    return this.player.updateGameState(this);
};

module.exports = GameState;
