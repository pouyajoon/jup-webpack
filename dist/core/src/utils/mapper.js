"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapper(r) {
    function m(a, b) {
        return { a: a, b: b };
    }
    function mL(a, b) {
        return a.map(function (p) { return m(p, b); });
    }
    return r(m, mL);
}
exports.mapper = mapper;
function getMapperMatch(mapperList, a) {
    var match = mapperList.find(function (m) { return m.a === a; });
    if (!match) {
        throw new Error("no match on " + a);
    }
    return match;
}
exports.getMapperMatch = getMapperMatch;
