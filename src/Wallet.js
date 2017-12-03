function Wallet(value) {
    this.value = value;
}

Wallet.prototype.isBroke = function () {
    return this.value <= 0;
};

Wallet.prototype.withdraw = function (value) {
    var newValue = this.value - value;

    if (newValue < 0) {
        this.value = 0;
    } else  {
        this.value = newValue;
    }

    return this;
};

Wallet.prototype.deposit = function (value) {
    this.value += value;

    return this;
};

module.exports = Wallet;
