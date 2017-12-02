function GameState(player, boxes) {
    this.player = player;
    this.boxes = boxes;
}

GameState.prototype.setPlayer = function (player) {
    return new GameState(player, this.boxes);
};

GameState.prototype.tick = function () {
    return new GameState(
        this.player.tick(),
        this.boxes
    );
};

module.exports = GameState;
