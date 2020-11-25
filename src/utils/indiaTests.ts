import { blueText, greenText, redText } from "../helpers/color";

interface TestResult {
  testedasof : string,
  totalindividualstested : string,
  totalpositivecases : string ,
  totalsamplestested : string 
}

export const testResultsIndia = (data : any) => {
  const {
    testedasof,
    totalindividualstested,
    totalpositivecases,
    totalsamplestested
  } : TestResult= data;
  console.log(data)
  console.log(`COVID TESTING DATA`);
  console.log("");
  console.log(`TESTED AS OF : ${blueText(
    (testedasof || 'N/A')
  )}`);
  console.log(`SAMPLES TESTED : ${greenText(
    totalindividualstested === '' ? 'Not Found' : parseInt(totalindividualstested).toLocaleString()
  )}`);
  console.log(`POSTITVE TESTED : ${redText(
    totalpositivecases === '' ? 'Not Found' : parseInt(totalpositivecases).toLocaleString()
  )}`);
  console.log(`TOTAL SAMPLE TESTED  : ${greenText(
    totalsamplestested === '' ? 'Not Found' : parseInt(totalsamplestested).toLocaleString()
  )}`);
}