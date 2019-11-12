"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArea2d(points, ratio) {
    var l = points.length;
    var det = 0;
    points = points.concat(points[0]);
    for (var i = 0; i < l; i += 1) {
        var a = (ratio * points[i].x) * (points[i + 1].y * ratio);
        var b = (ratio * points[i].y) * (points[i + 1].x * ratio);
        det += a - b;
    }
    return Math.abs(det) / 2;
}
exports.getArea2d = getArea2d;
