var Wallet = require("./Wallet");
var Coin = require("./Coin");
var Position = require("./Position");
var _ = require("lodash");

function Person() {
    this.position = new Position(0, 0);
    this.direction = 0;
    this.velocity = 0;
    this.angularVelocity = 0;
    this.health = 100;
    this.wallet = new Wallet(10);
}

Person.prototype.isDead = function () {
    return this.health <= 0;
};

Person.prototype.isMoving = function () {
    return this.velocity > 0;
};

Person.prototype.move = function (x, y) {
    this.position = this.position.move(x, y);

    return this;
};

Person.prototype.setVelocity = function (velocity) {
    this.velocity = velocity;

    return this;
};

Person.prototype.setAngularVelocity = function (angularVelocity) {
    this.angularVelocity = angularVelocity;

    return this;
}

Person.prototype.updateState = function () {
    this.direction = this.direction + this.angularVelocity;

    return this.move(
        this.position.x + (this.velocity * Math.sin(this.direction)),
        this.position.y + (this.velocity * -Math.cos(this.direction))
    );
};

Person.prototype.updateGameState = function (gameState) {
    var closestCoin = _(gameState.boxes)
        .filter(box => box instanceof Coin)
        .find(coin => coin.position.distance(this.position) < 1);

    if (closestCoin) {
        this.wallet = this.wallet.deposit(1);
        gameState = gameState.removeBox(closestCoin);
    }

    return gameState;
};

module.exports = Person;
