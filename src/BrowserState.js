function BrowserState(width, height, pixelRatio) {
    this.width = width;
    this.height = height;
    this.pixelRatio = pixelRatio;
}

BrowserState.create = function () {
    return new BrowserState(
        window.innerWidth,
        window.innerHeight,
        window.devicePixelRatio);
};

module.exports = BrowserState;
