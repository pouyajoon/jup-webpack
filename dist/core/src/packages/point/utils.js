"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function distanceBetweenPoints(p1, p2) {
    var x1 = p1.x, y1 = p1.y;
    var x2 = p2.x, y2 = p2.y;
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
}
exports.distanceBetweenPoints = distanceBetweenPoints;
