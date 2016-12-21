"use strict";
var common_1 = require('./common');
var method_1 = require('./method');
var main = function () {
    var RK = new method_1.RangekuttaMethod(0.1, 2, 0, common_1.F, common_1.Fx);
    RK.Output();
};
main();
//# sourceMappingURL=index.js.map