function Player() {
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.velocity = 0;
    this.health = 100;
    this.wealth = 10;
}

Player.prototype.isDead = function () {
    return this.health <= 0;
};

Player.prototype.isBroke = function () {
    return this.wealth <= 0;
};

Player.prototype.isMoving = function () {
    return this.velocity > 0;
};

Player.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;

    return this;
};

Player.prototype.setVelocity = function (velocity) {
    this.velocity = velocity;

    return this;
};

Player.prototype.moveLeft = function (deltaDirection) {
    this.direction -= deltaDirection;

    return this;
};

Player.prototype.moveRight = function (deltaDirection) {
    this.direction += deltaDirection;

    return this;
};

Player.prototype.tick = function () {
    return this.move(
        this.x + (this.velocity * Math.sin(this.direction)),
        this.y + (this.velocity * -Math.cos(this.direction))
    );
};

module.exports = Player;
