export const F = x => Math.pow(Math.E, -(x * x)) * (x * x / 2);
export const Fx = (x, y) => x * Math.pow(Math.E, -(x * x)) - 2 * x * y;