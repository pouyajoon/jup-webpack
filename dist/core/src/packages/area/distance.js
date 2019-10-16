"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lineDistance(point1, point2) {
    var xs = point2.x - point1.x;
    xs = xs * xs;
    var ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys);
}
exports.lineDistance = lineDistance;
