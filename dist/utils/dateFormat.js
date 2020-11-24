"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseDateFormat = exports.dateFormat = void 0;
// yyyy-mm-dd to dd-mm-yyyy
exports.dateFormat = (date) => {
    let p = date.split(/\D/g);
    return [p[2], p[1], p[0]].join("-");
};
// dd-mm-yyyy to yyyy-mm-dd
exports.reverseDateFormat = (date) => {
    return date.split("-").reverse().join("-");
};
