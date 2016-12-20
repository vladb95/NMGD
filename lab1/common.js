"use strict";
exports.F = function (x) { return Math.pow(Math.E, -(x * x)) * (x * x / 2); };
exports.Fx = function (x, y) { return x * Math.pow(Math.E, -(x * x)) - 2 * x * y; };
//# sourceMappingURL=common.js.map