import { blueText, greenText, headText, pinkText, redText } from "../helpers/color"
import { dateFormat } from "./dateFormat";

export const IndiaDaily = ( data : any) => {
  console.log(headText(`INDIA COVID DATA ${dateFormat(data['dateymd'])}`))
  console.log(" ");
  console.log(`CONFIRMED : ${blueText(parseInt(data['totalconfirmed']).toLocaleString())}`)
  console.log(`DECEASED  : ${redText((parseInt(data['totaldeceased']).toLocaleString()))}`)
  console.log(`RECOVERED : ${greenText((parseInt(data['totalrecovered']).toLocaleString()))}`)
  console.log(`REC. RATE : ${pinkText(((parseInt(data['totalrecovered'] || 1)/parseInt(data['totalconfirmed'] || 1)*100).toFixed(2)))}%`)

  console.log('');
  console.log(headText(`DAILY COVID-DATA ${dateFormat(data['dateymd'])}`))
  console.log('');
  console.log(`CONFIRMED : ${blueText(parseInt(data['dailyconfirmed'] || 'N/A').toLocaleString())}`)
  console.log(`DECEASED  : ${redText(parseInt(data['dailydeceased'] || 'N/A').toLocaleString())}`)
  console.log(`RECOVERED : ${greenText(parseInt(data['dailyrecovered'] || 'N/A').toLocaleString())}`)
}