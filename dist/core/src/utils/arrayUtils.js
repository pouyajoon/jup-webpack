"use strict";
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
