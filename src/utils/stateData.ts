import { headText, blueText, redText, greenText, purpleText, pinkText } from "../helpers/color";
import stateCode from "../helpers/stateCode";


interface StateTotal {
  confirmed: number;
  deceased:number;
  other: number;
  recovered: number;
  tested: number;
}

export const totalStateData = (
  data  : any,
  state : string,
) => {
  const {confirmed,deceased,recovered,tested} : StateTotal = data;
  console.log('');
  console.log(headText(`TOTAL COVID-DATA ${stateCode(state.toUpperCase())?.toUpperCase()}`))
  console.log('');
  console.log(`CONFIRMED : ${blueText(confirmed.toLocaleString())}`)
  console.log(`DECEASED  : ${redText(deceased.toLocaleString())}`)
  console.log(`RECOVERED : ${greenText(recovered.toLocaleString())}`)
  console.log(`TESTING   : ${purpleText(tested.toLocaleString())}`)
  console.log(`REC. RATE : ${pinkText((recovered/confirmed*100).toFixed(2))}%`)
}

export const dailyStateData = (
  data  : any,
  state : string,
) => {
  const {confirmed,deceased,recovered,tested} : StateTotal = data;
    console.log('');
    console.log(headText(`DAILY COVID-DATA ${stateCode(state.toUpperCase())?.toUpperCase()}`))
    console.log('');
    console.log(`CONFIRMED : ${blueText(confirmed.toLocaleString())}`)
    console.log(`DECEASED  : ${redText(deceased.toLocaleString())}`)
    console.log(`RECOVERED : ${greenText(recovered.toLocaleString())}`)
    console.log(`TESTING   : ${purpleText(tested.toLocaleString())}`)
}