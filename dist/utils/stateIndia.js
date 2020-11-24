"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndiaLiveData = void 0;
const stateCode_1 = __importDefault(require("../helpers/stateCode"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const color_1 = require("../helpers/color");
const as_table_1 = __importDefault(require("as-table"));
exports.getIndiaLiveData = async () => {
    const rawData = await node_fetch_1.default('https://api.covid19india.org/v3/data.json')
        .then((res) => res.json())
        .catch((err) => console.log(err.message));
    let dataSet = Object.keys(rawData).map(function (key) {
        return [key, rawData[key]];
    });
    dataSet.forEach((el) => {
        if (el[1]['total'] === undefined) {
            el[1]['total'] = 'N/A';
        }
        if (el[1]['delta'] === undefined) {
            el[1]['delta'] = 'N/A';
        }
    });
    // Resolving Undefined Values
    let sortedTempData = dataSet.sort((a, b) => b[1]['total']['confirmed'] - a[1]['total']['confirmed']);
    // sortedTempData.forEach((el)=>console.log(stateCode(el[0])))
    let finalSortedData = [];
    sortedTempData.forEach((el) => {
        const tempObj = {
            REGION: `${stateCode_1.default(el[0])}`,
            CASES: `${color_1.blueText((el[1]['total']['confirmed'] || 'N/A').toLocaleString())} ${color_1.lBlueText(el[1]['delta']['confirmed']
                ? '+'.concat(el[1]['delta']['confirmed'])
                : '')}`,
            DECEASED: `${color_1.redText((el[1]['total']['deceased'] || 'N/A').toLocaleString())} ${color_1.lRedText(el[1]['delta']['deceased'] ? '+'.concat(el[1]['delta']['deceased']) : '')}`,
            RECOVERED: `${color_1.greenText((el[1]['total']['recovered'] || 'N/A').toLocaleString())} ${color_1.lGreenText(el[1]['delta']['recovered']
                ? '+'.concat(el[1]['delta']['recovered'])
                : '')}`,
        };
        finalSortedData.push(tempObj);
    });
    // console.table(finalSortedData)
    console.log(color_1.headText('INDIA COVID DATA REGION WISE\n'));
    console.log(as_table_1.default(finalSortedData));
};
