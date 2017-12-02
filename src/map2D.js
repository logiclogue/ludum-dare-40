var _ = require("lodash");

var map2D = function (arrayOfArrays, f) {
    return _.map(arrayOfArrays, (array, y) => {
        return _.map(array, (value, x) => {
            return f(value, x, y);
        });
    });
};

module.exports = map2D;
