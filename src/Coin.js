var Position = require("./Position");

function Coin() {
    this.position = new Position(0, 0);
}

Coin.prototype.move = function (x, y) {
    this.position = this.position.move(x, y);

    return this;
};

module.exports = Coin;
