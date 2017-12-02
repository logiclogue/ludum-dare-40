function BrowserState() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
}

BrowserState.create = function () {
    new BrowserState(window.innerWidth, window.innerHeight);
};

module.exports = BrowserState;
