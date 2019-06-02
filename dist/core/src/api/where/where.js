"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFilter(operator, column, value) {
    return { operator: operator, column: column, value: value };
}
exports.createFilter = createFilter;
