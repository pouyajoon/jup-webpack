"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: nx, y: ny };
}
exports.rotate = rotate;
function rotatePoint(center, point, angle) {
    var cx = center.x, cy = center.y;
    var x = point.x, y = point.y;
    return rotate(cx, cy, x, y, angle);
}
exports.rotatePoint = rotatePoint;
function displayAngleInDegree(deg) {
    return Math.floor(deg) + " \u00B0";
}
exports.displayAngleInDegree = displayAngleInDegree;
