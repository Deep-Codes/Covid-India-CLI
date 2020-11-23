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
const diffDays_1 = require("./helpers/diffDays");
const apiUrl = `https://api.covid19india.org/v4/data.json`;
const timelineUrl = `https://api.covid19india.org/data.json`;
commander_1.program.version('0.0.1', '-v, --vers', 'output the current version');
commander_1.program
    .option('-d, --date', 'Specify Date for Data || Today ')
    .option('-st, --state <type>', 'state of India')
    .option('-t, --type <type>', 'get total | daily stats');
commander_1.program.parse(process.argv);
const fetchRawData = async (state) => {
    const rawData = await node_fetch_1.default(apiUrl)
        .then(res => res.json())
        .catch(err => console.log(err.message));
    handleState(rawData[state], commander_1.program.type, state);
};
if (commander_1.program.date) {
    /*
      ? Logic for India Data 'Date-Specific'
      ? Since the API data starts from 2020-01-30
      ? making it the index => 0 and the respective
      ? dates being the difference and the index of the array
    */
    let datetime = new Date();
    const startDate = '2020-01-30';
    const todayDate = datetime.toISOString().slice(0, 10);
    const indexOfDate = diffDays_1.diffDays(startDate, todayDate);
    // console.log(indexOfDate);
    const fetchRawData = async () => {
        const rawData = await node_fetch_1.default(timelineUrl)
            .then(res => res.json())
            .catch(err => console.log(err.message));
        console.log(rawData['cases_time_series'][indexOfDate]);
    };
    fetchRawData();
}
else {
    if (validState_1.stateArray.includes(commander_1.program.state.toUpperCase())) {
        fetchRawData(commander_1.program.state.toUpperCase());
    }
    else {
        throw new Error('Pass Correct Indian State Code');
    }
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
