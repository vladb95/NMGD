import { Fx, F } from './../lab1/common';
import { Adams } from './method';

(() => {
    let adamsObject: Adams = new Adams(0, 2, 0, F, Fx);
    adamsObject.Output();
})()