#!/usr/bin/env node
import fetch from  "node-fetch";
import {program} from 'commander';
import chalk from 'chalk';
import stateCode from "./helpers/stateCode";
import { blueText, greenText, headText, purpleText, redText } from "./helpers/color";

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
      'total'
    );
}
fetchRawData('AP')

interface StateTotal {
  confirmed: number;
  deceased:number;
  other: number;
  recovered: number;
  tested: number;
}

const handleState = (
  tempData : any,
  dataType : 'total' | 'daily'
) => {
  if(dataType === 'total'){
    const {confirmed , deceased , other  ,recovered, tested} : StateTotal = tempData[dataType];
    console.log('');
    console.log(headText(`COVID-DATA ${stateCode('AP')?.toUpperCase()}`))
    console.log('');
    console.log(`CONFIRMED : ${blueText(confirmed.toLocaleString())}`)
    console.log(`DECEASED  : ${redText(deceased.toLocaleString())}`)
    console.log(`RECOVERED : ${greenText(recovered.toLocaleString())}`)
    console.log(`TESTING   : ${purpleText(tested.toLocaleString())}`)
  }
}