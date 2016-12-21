"use strict";
//export const F = x => Math.pow(Math.E, -(x * x)) * (x * x / 2);
//export const Fx = (x, y) => x * Math.pow(Math.E, -(x * x)) - 2 * x * y;
exports.F = function (x) { return x * (1.0 / Math.pow(Math.E, Math.sin(x))); };
exports.Fx = function (x, y) { return 1.0 / Math.pow(Math.E, Math.sin(x)) - y * Math.cos(x); };
//# sourceMappingURL=common.js.map