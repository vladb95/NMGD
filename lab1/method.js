"use strict";
var RangekuttaMethod = (function () {
    function RangekuttaMethod(x0, xn, y0, func, fx) {
        this.x0 = x0;
        this.xn = xn;
        this.y0 = y0;
        this.func = func;
        this.fx = fx;
        this.eps = 10E-7;
        this.N = 100;
        var h = (xn - x0) / this.N;
        this.X = [];
        this.Ye = [];
        this.YRK3 = [];
        this.YRK4 = [];
        this.Y = [];
        this.Y[0] = y0;
        this.YRK3[0] = y0;
        this.YRK4[0] = y0;
        this.Ye[0] = y0;
        for (var i = 0; i < this.N; i++) {
            this.X[i] = x0 + h * i;
            this.Y[i] = this.func(this.X[i]);
        }
        this.Calculate();
    }
    RangekuttaMethod.prototype.Calculate = function () {
        for (var i = 0; i < this.N - 1; i++) {
            this.Ye[i + 1] = RangekuttaMethod.Eylera(this.X[i], this.X[i + 1], this.Ye[i], this.eps, this.fx);
            this.YRK3[i + 1] = RangekuttaMethod.RK3(this.X[i], this.X[i + 1], this.YRK3[i], this.eps, this.fx);
            this.YRK4[i + 1] = RangekuttaMethod.RK4(this.X[i], this.X[i + 1], this.YRK4[i], this.eps, this.fx);
        }
    };
    RangekuttaMethod.Eylera = function (x0, x1, y0, eps, fx) {
        var hx, xj, yj, ym, err, j, m;
        m = (x1 - x0) + 1.0;
        ym = Number.MAX_VALUE;
        do {
            hx = (x1 - x0) / m;
            yj = y0;
            xj = x0;
            for (j = 0; j < m; j++) {
                yj = yj + hx * fx(xj, yj);
                xj += hx;
            }
            err = Math.abs(ym - yj);
            ym = yj;
            m *= 10;
        } while (err > eps);
        return ym;
    };
    RangekuttaMethod.RK3 = function (x0, x1, y0, eps, fx) {
        var ht, xj, yj, ym, ymdx, err, m, j, k1, k2, k3;
        m = (x1 - x0) + 1.0;
        ym = Number.MAX_VALUE;
        ymdx = ym;
        do {
            ht = (x1 - x0) / m;
            xj = x0;
            yj = y0;
            for (j = 0; j < m; j++) {
                k1 = fx(xj, yj);
                k2 = fx(xj + 0.5 * ht, yj + 0.5 * k1);
                k3 = fx(xj + ht, yj + 2.0 * k2 - k1);
                yj = yj + ht * (k1 + 4.0 * k2 + k3) / 6.0;
                xj += ht;
            }
            err = (Math.abs(ym - yj));
            ym = yj;
            m *= 10;
        } while (err > eps);
        x1 = ym;
        return ym;
    };
    RangekuttaMethod.RK4 = function (x0, x1, y0, eps, fx) {
        var ht, xj, yj, ym, ymdx, err, m, j, k1, k2, k3, k4;
        m = (x1 - x0) + 1.0;
        ym = Number.MAX_VALUE;
        ymdx = ym;
        do {
            ht = (x1 - x0) / m;
            xj = x0;
            yj = y0;
            for (j = 0; j < m; j++) {
                k1 = fx(xj, yj);
                k2 = fx(xj + 0.5 * ht, yj + 0.5 * k1);
                k3 = fx(xj + 0.5 * ht, yj + 0.5 * k2);
                k4 = fx(xj + ht, yj + k3);
                yj = yj + ht / 6.0 * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
                xj += ht;
            }
            err = (Math.abs(ym - yj));
            ym = yj;
            m *= 10.0;
        } while (err > eps);
        x1 = ym;
        return ym;
    };
    RangekuttaMethod.prototype.Output = function () {
        for (var i = 0; i < this.N; i++) {
            console.log("x = " + this.X[i] + "    y = " + this.Y[i] + "    yEyl = " + this.Ye[i] + "    yRK4 = " + this.YRK4[i]);
        }
        for (var i = 0; i < this.N; i++) {
            console.log("x = " + this.X[i] + "    y = " + this.Y[i] + "    RK3 = " + this.YRK3[i]);
        }
        console.log("its All!");
    };
    return RangekuttaMethod;
}());
exports.RangekuttaMethod = RangekuttaMethod;
//# sourceMappingURL=method.js.map