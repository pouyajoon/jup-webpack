"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArea2d(points) {
    var l = points.length;
    var det = 0;
    points = points.concat(points[0]);
    for (var i = 0; i < l; i += 1) {
        det += points[i].x * points[i + 1].y - points[i].y * points[i + 1].x;
    }
    return Math.abs(det) / 2;
}
exports.getArea2d = getArea2d;
