import { RuleItemType } from '../components/rules/types';
import { MetricHint } from 'types';


export function findWorstStatus(metricHints: MetricHint[], rules: RuleItemType[]) {

  const statusOrder = ['information', 'warning', 'average', 'high', 'disaster'];
  let worstStatusIndex = -1;
  if (!rules) { return worstStatusIndex >= 0 ? statusOrder[worstStatusIndex] + '-state' : 'ok-state'; }
  for (const rule of rules) {
    let series;
    for (const hint of metricHints) {
      //if (hint.label === rule.seriesMatch) {
      if (new RegExp(rule.seriesMatch).test(hint.label)) {  
        series = hint;
        //break;
        if (!series) {continue;}
        const value = series.value;
        if (rule.displayMode === 'number' && rule.numberThreshold) {
          for (const [status, threshold] of Object.entries(rule.numberThreshold)) {
            if (threshold !== null) {
              if (status === 'showOnlyOnThreshold') {continue;}
              if (typeof value === 'number' && ( rule.revers ? (value <= parseFloat(threshold)) : (value >= parseFloat(threshold)))) {
                const statusIndex = statusOrder.indexOf(status);
                if (statusIndex > worstStatusIndex) {
                  worstStatusIndex = statusIndex;
                }
              }
            }  
          }
        } else if (rule.displayMode === 'string' && rule.stringThreshold) {
          for (const [status, statusValue] of Object.entries(rule.stringThreshold)) {
            if (String(value) === statusValue) {
              const statusIndex = statusOrder.indexOf(status);
              if (statusIndex > worstStatusIndex) {
                worstStatusIndex = statusIndex;
              }
            }
          }
        }
      }
    }
   

  }
  return worstStatusIndex >= 0 ? statusOrder[worstStatusIndex] + '-state' : 'ok-state';
}


