import { RangekuttaMethod } from './../lab1/index';
class Adams {
    X: number[]; Ye: number[]; Yi: number[]; Y: number[];
    eps = 10E-7;
    N: number;
    func: Function;
    fx: Function;

    public Adams(x0, xn, y0, func, fx) {
        let N = 100;
        let h: number = (xn - x0) / N;
        this.N += 1;
        this.X = <number[]>[];
        this.Ye = <number[]>[];
        this.Yi = <number[]>[];
        this.Y = <number[]>[];
        this.func = func;
        this.fx = fx;

        this.Y[0] = y0;
        this.Ye[0] = y0;
        this.Yi[0] = y0;

        for (let i: number = 0; i < this.N; i++) {
            this.X[i] = x0 + h * i;
            this.Y[i] = func(this.X[i]);
        }


        this.Calculate();
    }

    private Calculate(): void {
        this.Ye[1] = RangekuttaMethod.RK4(this.X[0], this.X[1], this.Ye[0], this.eps, this.fx);
        this.Ye[2] = RangekuttaMethod.RK4(this.X[1], this.X[2], this.Ye[1], this.eps, this.fx);
        this.Ye[3] = RangekuttaMethod.RK4(this.X[2], this.X[3], this.Ye[2], this.eps, this.fx);
        this.Yi[1] = RangekuttaMethod.RK4(this.X[0], this.X[1], this.Yi[0], this.eps, this.fx);
        this.Yi[2] = RangekuttaMethod.RK4(this.X[1], this.X[2], this.Yi[1], this.eps, this.fx);
        this.Yi[3] = RangekuttaMethod.RK4(this.X[2], this.X[3], this.Yi[2], this.eps, this.fx);
        for (let i = 0; i < this.N - 4; i++) {
            this.Ye[i + 4] = this.ecsp(this.X[i], this.X[i + 1], this.X[i + 2], this.X[i + 3], this.Ye[i], this.Ye[i + 1], this.Ye[i + 2], this.Ye[i + 3], this.fx);
            this.Yi[i + 4] = this.ecsp(this.X[i], this.X[i + 1], this.X[i + 2], this.X[i + 3], this.Yi[i], this.Yi[i + 1], this.Yi[i + 2], this.Yi[i + 3], this.fx);
            this.Yi[i + 4] = this.intr(this.X[i], this.X[i + 1], this.X[i + 2], this.X[i + 3], this.Yi[i + 1], this.Yi[i + 2], this.Yi[i + 3], this.Yi[i + 4], this.fx);
        }
    }

    public ecsp(x0, x1, x2, x3, y0, y1, y2, y3, fx) {
        let h: number = x1 - x0;
        return y3 + h / 24 * (55 * fx(x3, y3) - 59 * fx(x2, y2) + 37 * fx(x1, y1) - 9 * fx(x0, y0));
    }

    public intr(x0, x1, x2, x3, y0, y1, y2, y3, fx): number {
        let h: number = x1 - x0;
        return y2 + h / 24 * (9 * fx(x3, y3) + 19 * fx(x2, y2) - 5 * fx(x1, y1) + fx(x0, y0));
    }


    public Output(): void {
        for (let i = 0; i < this.N; i++) {
            console.log(`x = ${this.X[i]}    y = ${this.Y[i]}    yE = ${this.Ye[i]}    yI = ${this.Yi[i]}`);
        }
        console.log("its All for Adams!!!");
    }
}

(() => {

})()