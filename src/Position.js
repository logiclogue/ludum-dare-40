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

module.exports = Position;
