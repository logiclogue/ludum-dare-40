const map2D = require("../src/map2D");
const expect = require("chai").expect;

describe("map2D()", () => {
    context("map coordinates onto [[1, 2], [3, 4]]", () => {
        it("returns [[[1, 0, 0], [2, 1, 0]], [[3, 0, 1], [4, 1, 1]]]", () => {
            const result = map2D(
                [[1, 2], [3, 4]],
                (value, x, y) => [value, x, y]);

            expect(result).to.deep.equal(
                [[[1, 0, 0], [2, 1, 0]],
                [[3, 0, 1], [4, 1, 1]]]);
        });
    });
});
