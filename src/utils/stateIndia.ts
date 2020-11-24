import stateCode from '../helpers/stateCode';
import fetch from 'node-fetch';
import {
  blueText,
  greenText,
  headText,
  lBlueText,
  lGreenText,
  lRedText,
  redText,
} from '../helpers/color';
import asTable from 'as-table';

export const getIndiaLiveData = async (): Promise<void> => {
  const rawData = await fetch('https://api.covid19india.org/v3/data.json')
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
  let sortedTempData = dataSet.sort(
    (a, b) => b[1]['total']['confirmed'] - a[1]['total']['confirmed']
  );

  // sortedTempData.forEach((el)=>console.log(stateCode(el[0])))

  let finalSortedData: any = [];

  sortedTempData.forEach((el) => {
    const tempObj = {
      REGION: `${stateCode(el[0])}`,
      CASES: `${blueText(
        (el[1]['total']['confirmed'] || 'N/A').toLocaleString()
      )} ${lBlueText(
        el[1]['delta']['confirmed']
          ? '+'.concat(el[1]['delta']['confirmed'])
          : ''
      )}`,
      DECEASED: `${redText(
        (el[1]['total']['deceased'] || 'N/A').toLocaleString()
      )} ${lRedText(
        el[1]['delta']['deceased'] ? '+'.concat(el[1]['delta']['deceased']) : ''
      )}`,
      RECOVERED: `${greenText(
        (el[1]['total']['recovered'] || 'N/A').toLocaleString()
      )} ${lGreenText(
        el[1]['delta']['recovered']
          ? '+'.concat(el[1]['delta']['recovered'])
          : ''
      )}`,
    };
    finalSortedData.push(tempObj);
  });
  // console.table(finalSortedData)
  console.log(headText('INDIA COVID DATA REGION WISE\n'));
  console.log(asTable(finalSortedData));
};
