"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pluralize = __importStar(require("pluralize"));
exports.camelize = function (str) {
    if (!str) {
        return str;
    }
    var a = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) {
            return ''; // or if (/\s+/.test(match)) for white spaces
        }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
    a = a.replace(/_\w/g, function (m) {
        return m[1].toUpperCase();
    });
    return a;
};
exports.capitalize = function (s) {
    s = exports.camelize(s);
    return s.charAt(0).toUpperCase() + s.slice(1);
};
exports.toUnderscore = function (input) {
    return input.replace(/([A-Z])/g, function ($1) { return '_' + $1.toLowerCase(); });
};
exports.toPlural = function (s) {
    return pluralize.plural(s);
};
exports.singularize = function (s) {
    return pluralize.singular(s);
};
