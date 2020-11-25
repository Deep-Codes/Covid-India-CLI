#!/usr/bin/env node
import fetch from 'node-fetch';
import { program } from 'commander';
import { stateArray } from './helpers/validState';
import { dailyStateData, totalStateData } from './utils/stateData';
import { diffDays } from './helpers/diffDays';
import { IndiaDaily } from './utils/indiaDaily';
import { reverseDateFormat } from './utils/dateFormat';
import { getIndiaLiveData } from './utils/stateIndia';
import { testResultsIndia} from './utils/indiaTests';
import { redText } from './helpers/color';
import { stateTimeline } from './utils/stateTimeline';

const apiUrl: string = `https://api.covid19india.org/v4/data.json`;
const timelineUrl: string = `https://api.covid19india.org/data.json`;
const stateTimelineUrl : string = `https://api.covid19india.org/v4/data-all.json`;

program.version('1.0.0', '-v, --vers', 'output the current version');
program
  .option('-d, --date <type>', 'Specify Date dd-mm-yyyy')
  .option('-s, --state <type>', 'State/UT(Code) of India')
  .option('-t, --test <type>', 'Specify Date dd-mm-yyyy')
  .option('-st, --timeline <type>', 'State Wise Data on a Date')
  .option('-a, --author ', 'Get to know the Author');

program.parse(process.argv);

// ? If None Arguments are Based
// > covid-india
if (!(program.date || program.state || program.test || program.timeline)) {
  getIndiaLiveData();
}
// ? If any argument is passed
else {
  const fetchRawData = async (state: string): Promise<void> => {
    const rawData = await fetch(apiUrl)
      .then((res) => res.json())
      .catch((err) => console.log(err.message));
    handleState(rawData[state], state);
  };

  // ? COVID INDIA STATS BY DATE
  // * covid-india -d '14-06-2020'
  if (program.date && !(program.state || program.test)) {
    /*
      ? Logic for India Data 'Date-Specific'
      ? Since the API data starts from 2020-01-30
      ? making it the index => 0 and the respective
      ? dates being the difference and the index of the array
    */
    const startDate = '2020-01-30';
    const indexOfDate = diffDays(startDate, reverseDateFormat(program.date));
    const fetchRawData = async (): Promise<void> => {
      const rawData = await fetch(timelineUrl)
        .then((res) => res.json())
        .catch((err) => console.log(err.message));
      if(rawData['cases_time_series'][indexOfDate]){
        IndiaDaily(rawData['cases_time_series'][indexOfDate]);
      }else{
        console.log(redText(`No Data Found For the Date: ${program.date}`))
      }
    };
    fetchRawData();
  } 
  // ? COVID STATS BY STATE / UT
  // * covid-india -s 'MH'
  else if(program.state && !(program.date || program.test || program.timeline)) {
    if (stateArray.includes(program.state.toUpperCase())) {
      fetchRawData(program.state.toUpperCase());
    } else {
      console.log(redText('Pass Correct Indian State/UT Code'));
    }
  }
  // ? COVID TESTS 
  // * covid-india -ts '14-06-2020'
  else if(program.test && !(program.date || program.state || program.timeline)){
    //  Init Date : 18-03-2020
    const fetchRawData = async (): Promise<void> => {
      const rawData = await fetch(timelineUrl)
        .then((res) => res.json())
        .catch((err) => console.log(err.message));
      // ? Getting results with INDEX is not possible because
      // ? there's voids in dates so it would fetch data of incorrect dates
      const date = (program.test).replace(/-/g,'/')
      const sendData = rawData['tested'].filter((dt : any) => (dt['testedasof'] ) === date )
      if(!sendData[0]) console.log(redText(`No Data Found For the Date: ${program.test}`))
      else testResultsIndia(sendData[0] , program.test);
    };
    fetchRawData();
  }
  else if(program.timeline && !(program.date || program.state || program.test)){
    // console.log('State and Date :'+program.timeline )
    // console.log(program.timeline.split('-').reverse().join('-'))
    stateTimeline(program.timeline.split('-').reverse().join('-'))
    // stateTime
  }
  // ? COVID 
  const handleState = (
    tempData: any,
    state: string
  ) => {
      totalStateData(tempData['total'], state);
      // dailyStateData(tempData['delta'] , state);
    }
}

if(program.author){
  console.log(`Made by: Deepankar Bhade`)
}