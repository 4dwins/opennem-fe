/* eslint-disable */
import * as d3Collection from 'd3-collection';
import * as moment from 'moment';
import dataRollup from './data-rollup';

// Australia Seasons
function getStartMonth(month) {
  switch (month) {
    case 11: 
    case 0: 
    case 1:
      return 11;

    case 2: 
    case 3: 
    case 4:
      return 2;
    
    case 5: 
    case 6: 
    case 7:
      return 5;
    
    case 8: 
    case 9: 
    case 10:
      return 8;

    default:
  }
  return null;
}

function setStartMonth(date, currentMonth, qMonth) {
  const d = moment(date);
  d.set('month', qMonth);
  d.set('date', 1);
  d.set('hour', 0);
  d.set('minute', 0);
  d.set('second', 0);
  if (currentMonth === 0 || currentMonth === 1) {
    d.subtract(1, 'year');
  }
  return d;
}

export default function (data) {
  const cloneData = data;
  let currentMonth = moment(data[0].date).month();
  let nestDate = setStartMonth(data[0].date, currentMonth, getStartMonth(currentMonth));

  data.forEach((d, i) => {
    const q = moment(d.date).month();
    nestDate = setStartMonth(d.date, q, getStartMonth(q));
    cloneData[i].nestDate = nestDate.toDate();
  });

  const entries = d3Collection.nest()
    .key(d => d.nestDate)
    .rollup((d) => dataRollup(d))
    .entries(cloneData);
  
  console.log(entries)

  return entries.map((e) => {
    delete e.value.nestDate;
    return e.value;
  });
}
