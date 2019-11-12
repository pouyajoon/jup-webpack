"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y, z) {
        this.set(x, y, z);
    }
    Point.prototype.toString = function () {
        var _a = this, x = _a.x, y = _a.y, z = _a.z;
        return "(" + x + "," + y + "," + z + ")";
    };
    Point.prototype.set = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z || 0;
    };
    Object.defineProperty(Point.prototype, "point3d", {
        get: function () {
            return { x: this.x, y: this.y, z: this.z };
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.add = function (p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    };
    Point.prototype.substract = function (p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    };
    Point.prototype.divide = function (d) {
        this.x /= d;
        this.y /= d;
    };
    Point.prototype.multiply = function (d) {
        this.x *= d;
        this.y *= d;
        return this;
    };
    Point.prototype.clone = function () {
        return exports.Points.copy(this);
    };
    Object.defineProperty(Point.prototype, "point2d", {
        get: function () {
            return { x: this.x, y: this.y };
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.equals = function (p) {
        if (p === undefined) {
            return false;
        }
        var _a = this, x = _a.x, y = _a.y;
        return p.x === x && p.y === y;
    };
    return Point;
}());
exports.Point = Point;
exports.Points = {
    copy: function (p) { return new Point(p.x, p.y); }
};
