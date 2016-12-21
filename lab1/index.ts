import { Fx, F } from './common';
import { RangekuttaMethod } from './method';

let main = () => {
    let RK: RangekuttaMethod = new RangekuttaMethod(0.1, 2, 0, F, Fx);
    RK.Output();
};
main();