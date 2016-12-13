class RangekuttaMethod {
    X: number[];
    Ye: number[];
    YRK3: number[];
    YRK4: number[]; Y: number[];

    x0: number;
    y0: number; xn: number;
    eps: number = 10E-7;
    N: number;

    constructor(x0: number, xn: number, y0: number, public func: Function, public fx: Function) {
        this.N = 100;
        let h: number = (xn - x0) / this.N;
        this.X = <number[]>[];
        this.Ye = <number[]>[];
        this.YRK3 = <number[]>[];
        this.YRK4 = <number[]>[];
        this.Y = <number[]>[];

        for (let i: number = 0; i < this.N; i++) {
            this.X[i] = x0 + h * i;
            this.Y[i] = this.func(this.X[i]);
        }


        this.Calculate();
    }

    private Calculate() {
        for (let i = 0; i < this.N - 1; i++) {
            this.Ye[i + 1] = RangekuttaMethod.Eylera(this.X[i], this.X[i + 1], this.Ye[i], this.eps, this.fx);
            this.YRK3[i + 1] = RangekuttaMethod.RK3(this.X[i], this.X[i + 1], this.YRK3[i], this.eps, this.fx);
            this.YRK4[i + 1] = RangekuttaMethod.RK4(this.X[i], this.X[i + 1], this.YRK4[i], this.eps, this.fx);

        }
    }

    public static Eylera(x0: number, x1: number, y0: number, eps: number, fx: Function) {
        let hx, xj, yj, ym, err,
            j, m;
        m = <number>(x1 - x0) + 1; ym = Number.MAX_VALUE;
        do {
            hx = (x1 - x0) / m; yj = y0; xj = x0;
            for (j = 0; j < m; j++) {
                yj = yj + hx * fx(xj, yj); xj += hx;
            }
            err = Math.abs(ym - yj); ym = yj; m *= 10;
        }
        while (err > eps);
        return ym;
    }

    public static RK3(x0, x1, y0, eps, fx: Function) {
        let ht, xj, yj, ym, ymdx, err,
            m, j,
            k1, k2, k3;

        m = <number>(x1 - x0) + 1; ym = Number.MAX_VALUE; ymdx = ym;
        do {
            ht = (x1 - x0) / m;
            xj = x0; yj = y0;
            for (j = 0; j < m; j++) {
                k1 = fx(xj, yj);
                k2 = fx(xj + 0.5 * ht, yj + 0.5 * k1);
                k3 = fx(xj + ht, yj + 2 * k2 - k1);
                yj = yj + ht * (k1 + 4 * k2 + k3) / 6;
                xj += ht;
            }
            err = (Math.abs(ym - yj));
            ym = yj; m *= 10;
        } while (err > eps);
        x1 = ym;

        return ym;
    }

    public static RK4(x0, x1, y0, eps, fx: Function) {
        let ht, xj, yj, ym, ymdx, err,
            m, j,
            k1, k2, k3, k4;

        m = <number>(x1 - x0) + 1; ym = Number.MAX_VALUE; ymdx = ym;
        do {
            ht = (x1 - x0) / m;
            xj = x0; yj = y0;
            for (j = 0; j < m; j++) {
                k1 = fx(xj, yj);
                k2 = fx(xj + 0.5 * ht, yj + 0.5 * k1);
                k3 = fx(xj + 0.5 * ht, yj + 0.5 * k2);
                k4 = fx(xj + ht, yj + k3);
                yj = yj + ht / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
                xj += ht;
            }
            err = (Math.abs(ym - yj));
            ym = yj; m *= 10;
        } while (err > eps);
        x1 = ym;

        return ym;
    }

    public Output() {

        for (let i = 0; i < this.N; i++) {
            console.log(`x = ${this.X[i]}    y = ${this.Y[i]}    yEyl = ${this.Ye[i]}    yRK4 = ${this.YRK4[i]}`);
        }

        for (let i = 0; i < this.N; i++) {
            console.log(`x = ${this.X[i]}    y = ${this.Y[i]}    RK3 = ${this.YRK3[i]}`);
        }

        console.log("its All!");

    }
}

function main(): void {
    let RK: RangekuttaMethod = new RangekuttaMethod(0, 2, 0, x => Math.pow(Math.E, -(x * x)) * (x * x / 2), (x, y) => x * Math.pow(Math.E, -(x * x)) - 2 * x * y);
    RK.Output();
}

main();