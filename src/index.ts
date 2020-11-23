#!/usr/bin/env node
import fetch from  "node-fetch";
import {program} from 'commander';
import { stateArray } from "./helpers/validState";
import {  dailyStateData, totalStateData } from "./utils/stateData";
import { diffDays } from "./helpers/diffDays";
import { IndiaDaily } from "./utils/indiaDaily";

const apiUrl : string = `https://api.covid19india.org/v4/data.json`;
const timelineUrl : string =  `https://api.covid19india.org/data.json`

program.version('0.0.1', '-v, --vers', 'output the current version'); 
program
  .option('-d, --date <type>', 'Specify Date for Data || Today ')
  .option('-st, --state <type>', 'state of India')
  .option('-t, --type <type>', 'get total | daily stats')

program.parse(process.argv);

// ? If None Arguments are Based
// > covid-india
if(!(program.date || program.state || program.type)){
  let datetime = new Date();
  const startDate = '2020-01-30'
  const todayDate = datetime.toISOString().slice(0,10)
  const indexOfDate = diffDays(startDate,todayDate);
  const fetchRawData = async (): Promise<void> => {
    const rawData = await fetch(timelineUrl)
      .then(res => res.json())
      .catch(err => console.log(err.message));
      IndiaDaily(rawData['cases_time_series'][indexOfDate])  
  }
  fetchRawData();
}
// ? If any argument is passed
else{
  const fetchRawData = async (state : string): Promise<void> => {
    const rawData = await fetch(apiUrl)
      .then(res => res.json())
      .catch(err => console.log(err.message));
        handleState(
          rawData[state],
          program.type,
          state
        );
  }
  
  if(program.date){
    /*
      ? Logic for India Data 'Date-Specific'
      ? Since the API data starts from 2020-01-30
      ? making it the index => 0 and the respective
      ? dates being the difference and the index of the array
    */
    let datetime = new Date();
    const startDate = '2020-01-30'
    const indexOfDate = diffDays(startDate,program.date);
    const fetchRawData = async (): Promise<void> => {
      const rawData = await fetch(timelineUrl)
        .then(res => res.json())
        .catch(err => console.log(err.message));
        IndiaDaily(rawData['cases_time_series'][indexOfDate])  
    }
    fetchRawData();
  } else{
    if(stateArray.includes(program.state.toUpperCase())){
      fetchRawData(program.state.toUpperCase())
    }else{
      throw new Error('Pass Correct Indian State/UT Code')
    }
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
}
