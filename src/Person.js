var Wallet = require("./Wallet");

function Person() {
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.velocity = 0;
    this.health = 100;
    this.wealth = 10;
    this.wallet = new Wallet(10);
}

Person.prototype.isDead = function () {
    return this.health <= 0;
};

Person.prototype.isMoving = function () {
    return this.velocity > 0;
};

Person.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;

    return this;
};

Person.prototype.setVelocity = function (velocity) {
    this.velocity = velocity;

    return this;
};

Person.prototype.moveLeft = function (deltaDirection) {
    this.direction -= deltaDirection;

    return this;
};

Person.prototype.moveRight = function (deltaDirection) {
    this.direction += deltaDirection;

    return this;
};

Person.prototype.updateState = function () {
    return this.move(
        this.x + (this.velocity * Math.sin(this.direction)),
        this.y + (this.velocity * -Math.cos(this.direction))
    );
};

Person.prototype.updateGameState = function (gameState) {
    return gameState;
};

module.exports = Person;
