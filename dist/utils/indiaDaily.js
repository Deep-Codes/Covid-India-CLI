"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndiaDaily = void 0;
const color_1 = require("../helpers/color");
const dateFormat_1 = require("./dateFormat");
exports.IndiaDaily = (data) => {
    console.log(color_1.headText(`INDIA COVID DATA ${dateFormat_1.dateFormat(data['dateymd'])}`));
    console.log(" ");
    console.log(`CONFIRMED : ${color_1.blueText(parseInt(data['totalconfirmed']).toLocaleString())}`);
    console.log(`DECEASED  : ${color_1.redText((parseInt(data['totaldeceased']).toLocaleString()))}`);
    console.log(`RECOVERED : ${color_1.greenText((parseInt(data['totalrecovered']).toLocaleString()))}`);
    console.log(`REC. RATE : ${color_1.pinkText(((parseInt(data['totalrecovered'] || 1) / parseInt(data['totalconfirmed'] || 1) * 100).toFixed(2)))}%`);
    console.log('');
    console.log(color_1.headText(`DAILY COVID-DATA ${dateFormat_1.dateFormat(data['dateymd'])}`));
    console.log('');
    console.log(`CONFIRMED : ${color_1.blueText(parseInt(data['dailyconfirmed'] || 'N/A').toLocaleString())}`);
    console.log(`DECEASED  : ${color_1.redText(parseInt(data['dailydeceased'] || 'N/A').toLocaleString())}`);
    console.log(`RECOVERED : ${color_1.greenText(parseInt(data['dailyrecovered'] || 'N/A').toLocaleString())}`);
};
