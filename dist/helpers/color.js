"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blueText = exports.purpleText = exports.greenText = exports.redText = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.redText = (val) => {
    return chalk_1.default.hex('#e8505b').bold(val);
};
exports.greenText = (val) => {
    return chalk_1.default.hex('#28df99').bold(val);
};
exports.purpleText = (val) => {
    return chalk_1.default.hex('#7f78d2').bold(val);
};
exports.blueText = (val) => {
    return chalk_1.default.hex('#3282b8').bold(val);
};
