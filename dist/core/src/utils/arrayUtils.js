"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
function mergeArrayOfArray(a) {
    return [].concat.apply([], a);
}
exports.mergeArrayOfArray = mergeArrayOfArray;
function chunk(list, size) {
    return list.reduce(function (all, one, i) {
        var ch = Math.floor(i / size);
        all[ch] = [].concat((all[ch] || []), one);
        return all;
    }, []);
}
exports.chunk = chunk;
function uniqueArray(a) {
    var result = __spread(new Set(a));
    return result;
}
exports.uniqueArray = uniqueArray;
function mergeOnAnObjectByName(acc, v) {
    acc[v.name] = v;
    return acc;
}
exports.mergeOnAnObjectByName = mergeOnAnObjectByName;
function mergeOnAnObjectById(acc, v) {
    acc[v.id] = v;
    return acc;
}
exports.mergeOnAnObjectById = mergeOnAnObjectById;
function mergeValueByName(acc, v) {
    acc[v.name] = v.value;
    return acc;
}
exports.mergeValueByName = mergeValueByName;
function mergeOnAnObjectByNameRemoveName(acc, v) {
    acc[v.name] = v;
    delete v.name;
    return acc;
}
exports.mergeOnAnObjectByNameRemoveName = mergeOnAnObjectByNameRemoveName;
function mergeOnName(list) {
    var init = {};
    var modelsStore = list.reduce(mergeOnAnObjectByName, init);
    return modelsStore;
}
exports.mergeOnName = mergeOnName;
