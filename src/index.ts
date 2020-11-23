#!/usr/bin/env node
import fetch from  "node-fetch";
import {program} from 'commander';
import chalk from 'chalk';
import stateCode from "./helpers/stateCode";
import { blueText, greenText, headText, pinkText, purpleText, redText } from "./helpers/color";
import { stateArray } from "./helpers/validState";
import {  dailyStateData, totalStateData } from "./utils/stateData";

const apiUrl : string = `https://api.covid19india.org/v4/data.json`;

program.version('0.0.1', '-v, --vers', 'output the current version'); 
program
  .option('-d, --debug', 'output extra debugging')
  .option('-st, --state <type>', 'state of India')
  .option('-t, --type <type>', 'get total | daily stats')

program.parse(process.argv);

if (program.debug) console.log(program.opts());

const fetchRawData = async (state : string): Promise<void> => {
  const rawData = await fetch(apiUrl)
    .then(res => res.json())
    .catch(err => console.log(err.message));
    // console.log(rawData[state])
      handleState(
        rawData[state],
        program.type,
        state
      );
}
if(stateArray.includes(program.state.toUpperCase())){
  fetchRawData(program.state.toUpperCase())
}else{
  throw new Error('Pass Correct Indian State Code')
}


const handleState = (
  tempData : any,
  dataType : 'total' | 'daily' | undefined,
  state: string
) => {
  if(dataType === 'total'){
    totalStateData(tempData['total'] , state);
  } else if(dataType === 'daily'){
    dailyStateData(tempData['delta'] , state);
  } else if (dataType === undefined){
    totalStateData(tempData['total'] , state);
    dailyStateData(tempData['delta'] , state);
  }
}