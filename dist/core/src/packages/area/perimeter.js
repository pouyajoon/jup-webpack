"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var distance_1 = require("./distance");
function getPerimeter(points, scale) {
    var d = 0;
    var sumDistance = 0;
    var length = scale.length, dimension = scale.dimension;
    var p2;
    var p1;
    for (var i = 0; i < points.length - 1; i += 1) {
        p1 = points[0];
        if (i === 0) {
            p2 = points[points.length - 1];
        }
        else {
            p2 = points[i + 1];
        }
        d = distance_1.lineDistance(p1, p2) * length / dimension;
        sumDistance += d;
    }
    return parseFloat(sumDistance.toFixed(1));
}
exports.getPerimeter = getPerimeter;
