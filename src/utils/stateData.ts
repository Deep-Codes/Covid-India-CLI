import { headText, blueText, redText, greenText, purpleText, pinkText } from "../helpers/color";
import stateCode from "../helpers/stateCode";


interface StateTotal {
  confirmed: number | undefined;
  deceased:number | undefined;
  other: number | undefined;
  recovered: number | undefined;
  tested: number | undefined;
}

export const totalStateData = (
  data  : any,
  state : string,
) => {
  const {confirmed,deceased,recovered,tested} : StateTotal = data;
  console.log('');
  console.log(headText(`TOTAL COVID-DATA ${stateCode(state.toUpperCase())?.toUpperCase()}`))
  console.log('');
  console.log(`CONFIRMED : ${blueText((confirmed || 'N/A').toLocaleString())}`)
  console.log(`DECEASED  : ${redText((deceased || 'N/A').toLocaleString())}`)
  console.log(`RECOVERED : ${greenText((recovered || 'N/A').toLocaleString())}`)
  console.log(`TESTING   : ${purpleText((tested || 'N/A').toLocaleString())}`)
  console.log(`REC. RATE : ${pinkText(((recovered || 1)/(confirmed || 1)*100).toFixed(2))}%`)
}

export const dailyStateData = (
  data  : any,
  state : string,
) => {

  const {confirmed,deceased,recovered,tested} : StateTotal = data;
    console.log('');
    console.log(headText(`DAILY COVID-DATA ${stateCode(state.toUpperCase())?.toUpperCase()}`))
    console.log('');
    console.log(`CONFIRMED : ${blueText((confirmed || 'N/A').toLocaleString())}`)
    console.log(`DECEASED  : ${redText((deceased || 'N/A').toLocaleString())}`)
    console.log(`RECOVERED : ${greenText((recovered || 'N/A').toLocaleString())}`)
    console.log(`TESTING   : ${purpleText((tested || 'N/A').toLocaleString())}`)
}
