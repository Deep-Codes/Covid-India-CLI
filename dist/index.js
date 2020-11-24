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
const indiaDaily_1 = require("./utils/indiaDaily");
const dateFormat_1 = require("./utils/dateFormat");
const stateIndia_1 = require("./utils/stateIndia");
const apiUrl = `https://api.covid19india.org/v4/data.json`;
const timelineUrl = `https://api.covid19india.org/data.json`;
commander_1.program.version('1.0.0', '-v, --vers', 'output the current version');
commander_1.program
    .option('-d, --date <type>', 'Specify Date dd-mm-yyyy')
    .option('-s, --state <type>', 'State/UT(Code) of India')
    .option('-t, --type <type>', 'get Total || Daily stats')
    .option('-a, --author ', 'Get to know the Author');
commander_1.program.parse(process.argv);
// ? If None Arguments are Based
// > covid-india
if (!(commander_1.program.date || commander_1.program.state || commander_1.program.type)) {
    stateIndia_1.getIndiaLiveData();
}
// ? If any argument is passed
else {
    const fetchRawData = async (state) => {
        const rawData = await node_fetch_1.default(apiUrl)
            .then((res) => res.json())
            .catch((err) => console.log(err.message));
        handleState(rawData[state], commander_1.program.type, state);
    };
    if (commander_1.program.date) {
        /*
          ? Logic for India Data 'Date-Specific'
          ? Since the API data starts from 2020-01-30
          ? making it the index => 0 and the respective
          ? dates being the difference and the index of the array
        */
        const startDate = '2020-01-30';
        const indexOfDate = diffDays_1.diffDays(startDate, dateFormat_1.reverseDateFormat(commander_1.program.date));
        const fetchRawData = async () => {
            const rawData = await node_fetch_1.default(timelineUrl)
                .then((res) => res.json())
                .catch((err) => console.log(err.message));
            indiaDaily_1.IndiaDaily(rawData['cases_time_series'][indexOfDate]);
        };
        fetchRawData();
    }
    else {
        if (validState_1.stateArray.includes(commander_1.program.state.toUpperCase())) {
            fetchRawData(commander_1.program.state.toUpperCase());
        }
        else {
            throw new Error('Pass Correct Indian State/UT Code');
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
            // dailyStateData(tempData['delta'] , state);
        }
    };
}
if (commander_1.program.author) {
    console.log(`Made by: Deepankar Bhade`);
}
