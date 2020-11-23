#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const commander_1 = require("commander");
const validState_1 = require("./helpers/validState");
const stateData_1 = require("./utils/stateData");
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
    handleState(rawData[state], commander_1.program.type, state);
};
if (validState_1.stateArray.includes(commander_1.program.state.toUpperCase())) {
    fetchRawData(commander_1.program.state.toUpperCase());
}
else {
    throw new Error('Pass Correct Indian State Code');
}
const handleState = (tempData, dataType, state) => {
    if (dataType === 'total') {
        stateData_1.totalStateData(tempData['total'], state);
    }
    else if (dataType === 'daily') {
        stateData_1.dailyStateData(tempData['delta'], state);
    }
    else if (dataType === undefined) {
        stateData_1.totalStateData(tempData['total'], state);
        stateData_1.dailyStateData(tempData['delta'], state);
    }
};
