import asTable from 'as-table';
import fetch from 'node-fetch';
import { blueText, redText, greenText, headText } from '../helpers/color';
import stateCode from '../helpers/stateCode';
import { Spinner } from 'cli-spinner';

export const stateTimeline = async (date: string): Promise<void> => {
  let obj = new Spinner('Loading | Keep a safe distance .. %s');
  obj.start();
  const rawArr: any = [];
  const finalArr: any = [];
  const rawData: any = await fetch(
    'https://api.covid19india.org/v4/data-all.json'
  )
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
  // ?  If the date is valid
  if (rawData[date]) {
    for (let st in rawData[date]) {
      if (rawData[date][st]['total']) {
        rawArr.push({
          state: st,
          val: rawData[date][st]['total'],
        });
      }
    }

    let sortedArr: any = [];
    sortedArr = rawArr.sort(
      (a: any, b: any) => b['val']['confirmed'] - a['val']['confirmed']
    );
    sortedArr.forEach((el: any) => {
      const tempObj = {
        REGION: `${stateCode(el['state'])}`,
        CASES: `${blueText(
          (el['val']['confirmed'] || 'N/A').toLocaleString()
        )}`,
        DECEASED: `${redText(
          (el['val']['deceased'] || 'N/A').toLocaleString()
        )}`,
        RECOVERED: `${greenText(
          (el['val']['recovered'] || 'N/A').toLocaleString()
        )}`,
      };
      finalArr.push(tempObj);
    });
    obj.stop(true);
    console.log(headText('\nINDIA STATE DATA ON ' + date + '\n'));
    console.log(asTable(finalArr));
  } else {
    obj.stop(true);
    console.log(redText(`Data for Date : ${date} not found`));
  }
};
