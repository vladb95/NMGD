//export const F = x => Math.pow(Math.E, -(x * x)) * (x * x / 2);
//export const Fx = (x, y) => x * Math.pow(Math.E, -(x * x)) - 2 * x * y;
export const F = x => x * ( 1.0 / Math.pow(Math.E, Math.sin(x)));
export const Fx = (x, y) => 1.0 / Math.pow(Math.E, Math.sin(x)) - y * Math.cos(x);