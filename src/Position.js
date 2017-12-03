function Position(x, y) {
    this.x = x;
    this.y = y;
}

Position.create = function () {
    this.x = 0;
    this.y = 0;
};

Position.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;

    return this;
};

Position.prototype.distance = function (position) {
    return Math.sqrt(
        Math.pow(this.x - position.x, 2) +
        Math.pow(this.y - position.y, 2));
};

module.exports = Position;
