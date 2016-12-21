import { RangekuttaMethod } from './../lab1/method';
import { Fx, F } from './../lab1/common';

(()=>{
    let rk: RangekuttaMethod = new RangekuttaMethod(0.1, 2, 0, F, Fx);
    rk.Output();
})();