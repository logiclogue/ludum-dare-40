function Player(x, y, direction, velocity, health) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.velocity = velocity;
    this.health = 100;

    this.isDead = this.health <= 0;
    this.isMoving = this.velocity > 0;
}

Player.create = function () {
    return new Player(0, 0, 0, 0, 100);
}

Player.prototype.move = function (x, y) {
    return new Player(x, y, this.direction, this.velocity, this.health);
};

Player.prototype.setVelocity = function (velocity) {
    return new Player(
        this.x,
        this.y,
        this.direction,
        velocity,
        this.health
    );
};

Player.prototype.moveLeft = function (deltaDirection) {
    return new Player(
        this.x,
        this.y,
        this.direction - deltaDirection,
        this.velocity,
        this.health
    );
};

Player.prototype.moveRight = function (deltaDirection) {
    return new Player(
        this.x,
        this.y,
        this.direction + deltaDirection,
        this.velocity,
        this.health
    );
};

Player.prototype.tick = function () {
    return new Player(
        this.x + (this.velocity * Math.sin(this.direction)),
        this.y + (this.velocity * Math.cos(this.direction)),
        this.direction,
        this.velocity,
        this.health
    );
};

module.exports = Player;
