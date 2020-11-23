"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyStateData = exports.totalStateData = void 0;
const color_1 = require("../helpers/color");
const stateCode_1 = __importDefault(require("../helpers/stateCode"));
exports.totalStateData = (data, state) => {
    var _a;
    const { confirmed, deceased, recovered, tested } = data;
    console.log('');
    console.log(color_1.headText(`TOTAL COVID-DATA ${(_a = stateCode_1.default(state.toUpperCase())) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`));
    console.log('');
    console.log(`CONFIRMED : ${color_1.blueText((confirmed || 'N/A').toLocaleString())}`);
    console.log(`DECEASED  : ${color_1.redText((deceased || 'N/A').toLocaleString())}`);
    console.log(`RECOVERED : ${color_1.greenText((recovered || 'N/A').toLocaleString())}`);
    console.log(`TESTING   : ${color_1.purpleText((tested || 'N/A').toLocaleString())}`);
    console.log(`REC. RATE : ${color_1.pinkText(((recovered || 1) / (confirmed || 1) * 100).toFixed(2))}%`);
};
exports.dailyStateData = (data, state) => {
    var _a;
    const { confirmed, deceased, recovered, tested } = data;
    console.log('');
    console.log(color_1.headText(`DAILY COVID-DATA ${(_a = stateCode_1.default(state.toUpperCase())) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`));
    console.log('');
    console.log(`CONFIRMED : ${color_1.blueText((confirmed || 'N/A').toLocaleString())}`);
    console.log(`DECEASED  : ${color_1.redText((deceased || 'N/A').toLocaleString())}`);
    console.log(`RECOVERED : ${color_1.greenText((recovered || 'N/A').toLocaleString())}`);
    console.log(`TESTING   : ${color_1.purpleText((tested || 'N/A').toLocaleString())}`);
};
