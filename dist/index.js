#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const commander_1 = require("commander");
const stateCode_1 = __importDefault(require("./helpers/stateCode"));
const color_1 = require("./helpers/color");
const apiUrl = `https://api.covid19india.org/v4/data.json`;
commander_1.program.version('0.0.1', '-v, --vers', 'output the current version');
commander_1.program
    .option('-d, --debug', 'output extra debugging')
    .option('-st, --state <type>', 'state of India')
    .option('-t, --type <type>', 'get total | daily stats');
commander_1.program.parse(process.argv);
if (commander_1.program.debug)
    console.log(commander_1.program.opts());
const fetchRawData = async (state) => {
    const rawData = await node_fetch_1.default(apiUrl)
        .then(res => res.json())
        .catch(err => console.log(err.message));
    // console.log(rawData[state])
    handleState(rawData[state], 'total');
};
fetchRawData('MH');
const handleState = (tempData, dataType) => {
    var _a;
    if (dataType === 'total') {
        const { confirmed, deceased, other, recovered, tested } = tempData[dataType];
        console.log(`COVID-DATA ${(_a = stateCode_1.default('MH')) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`);
        console.log('');
        console.log(`CONFIRMED : ${color_1.blueText(confirmed.toLocaleString())}`);
        console.log(`DECEASED : ${color_1.redText(deceased.toLocaleString())}`);
        console.log(`RECOVERED : ${color_1.greenText(recovered.toLocaleString())}`);
        console.log(`TESTING : ${color_1.purpleText(tested.toLocaleString())}`);
    }
};
