"use strict";
var method_1 = require('./../lab1/method');
var Miln = (function () {
    function Miln(x0, xn, y0, func, fx) {
        this.func = func;
        this.fx = fx;
        this.eps = 10E-7;
        this.N = 100;
        var h = (xn - x0) / this.N;
        this.N += 1;
        this.X = [];
        this.Ym4 = [];
        this.Ym6 = [];
        this.Y = [];
        this.func = func;
        this.fx = fx;
        this.Y[0] = y0;
        this.Ym4[0] = y0;
        this.Ym6[0] = y0;
        for (var i = 0; i < this.N; i++) {
            this.X[i] = x0 + h * i;
            this.Y[i] = func(this.X[i]);
        }
        this.Calculate();
    }
    Miln.prototype.Calculate = function () {
        this.Ym4[1] = method_1.RangekuttaMethod.RK4(this.X[0], this.X[1], this.Ym4[0], this.eps, this.fx);
        this.Ym4[2] = method_1.RangekuttaMethod.RK4(this.X[1], this.X[2], this.Ym4[1], this.eps, this.fx);
        this.Ym4[3] = method_1.RangekuttaMethod.RK4(this.X[2], this.X[3], this.Ym4[2], this.eps, this.fx);
        this.Ym6[1] = method_1.RangekuttaMethod.RK4(this.X[0], this.X[1], this.Ym6[0], this.eps, this.fx);
        this.Ym6[2] = method_1.RangekuttaMethod.RK4(this.X[1], this.X[2], this.Ym6[1], this.eps, this.fx);
        this.Ym6[3] = method_1.RangekuttaMethod.RK4(this.X[2], this.X[3], this.Ym6[2], this.eps, this.fx);
        this.Ym6[4] = method_1.RangekuttaMethod.RK4(this.X[3], this.X[4], this.Ym6[3], this.eps, this.fx);
        for (var i = 0; i < this.N - 4; i++) {
            this.Ym4[i + 4] = Miln.M4(this.X[i], this.X[i + 1], this.X[i + 2], this.X[i + 3], this.X[i + 4], this.Ym4[i], this.Ym4[i + 1], this.Ym4[i + 2], this.Ym4[i + 3], this.fx);
        }
        for (var i = 0; i < this.N - 5; i++) {
            this.Ym6[i + 4] = Miln.M6(this.X[i], this.X[i + 1], this.X[i + 2], this.X[i + 3], this.X[i + 4], this.X[i + 5], this.Ym6[i], this.Ym6[i + 1], this.Ym6[i + 2], this.Ym6[i + 3], this.Ym6[i + 4], this.fx);
        }
    };
    Miln.M4 = function (x0, x1, x2, x3, x4, y0, y1, y2, y3, fx) {
        var h = x1 - x0;
        var y = y0 + 4 * h / 3 * (2 * fx(x2, y2)) - fx(x1, y1) + 2 * fx(y0, x0);
        for (var i = 0; i < 4; i++) {
            y = y2 + h / 3 * (y + 4 * fx(x3, y3) + fx(x2, y2));
        }
        return y2 + h / 3 * (fx(x4, y) + 4 * fx(x3, y3) + fx(x2, y2));
    };
    Miln.M6 = function (x0, x1, x2, x3, x4, x5, y0, y1, y2, y3, y4, fx) {
        var h = x1 - x0;
        var y = y3 + 3 * h / 10 * (11 * fx(y4, x4) - 14 * fx(x3, y3) + 26 * fx(x2, y2) - 14 * fx(x1, y1) + 11 * fx(x0, y0));
        for (var i = 0; i < 6; i++) {
            y = y1 + 4 * h / 90 * (7 * fx(x5, y) + 32 * fx(x4, y4) + 12 * fx(x3, y3) + 32 * fx(x2, y2) + 7 * fx(x1, y1));
        }
        return y1 + 4 * h / 90 * (7 * fx(x5, y) + 32 * fx(x4, y4) + 12 * fx(x3, y3) + 32 * fx(x2, y2) + 7 * fx(x1, y1));
    };
    Miln.prototype.Output = function () {
        for (var i = 0; i < this.N; i++) {
            console.log("x = " + this.X[i] + "    y = " + this.Y[i] + "    y4 = " + this.Ym4[i] + "    y6 = " + this.Ym6[i]);
        }
        console.log("its All for Miln!!!");
    };
    return Miln;
}());
exports.Miln = Miln;
//# sourceMappingURL=method.js.map