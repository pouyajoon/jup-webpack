"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_1 = require("./distance");
function getPerimeter(points, ratio) {
    var d = 0;
    var sumDistance = 0;
    for (var i = 0; i < points.length - 1; i += 1) {
        var p1 = points[0];
        var p2 = i === 0 ? points[points.length - 1] : points[i + 1];
        d = distance_1.lineDistance(p1, p2) * ratio;
        sumDistance += d;
    }
    return parseFloat(sumDistance.toFixed(1));
}
exports.getPerimeter = getPerimeter;
