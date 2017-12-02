function Player(x, y, direction, velocity, health) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.velocity = velocity;
    this.health = health;
}

Player.create = function () {
    return new Player(0, 0, 0, 0, 100);
};

Player.prototype.isDead = function () {
    return this.health <= 0;
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
    this.x += (this.velocity * Math.sin(this.direction));
    this.y += (this.velocity * Math.cos(this.direction));

    return this;
};

module.exports = Player;
