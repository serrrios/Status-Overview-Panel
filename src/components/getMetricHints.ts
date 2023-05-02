import { DataFrameToMetrics } from './processor'
import { PanelData } from '@grafana/data';


interface MetricHint {
    label: string;
    value: any;
}
  
export function getMetricHints(data: PanelData): MetricHint[] {
    const hints: MetricHint[] = [];
    for (const metric of data.series) {
      const hintsValue = DataFrameToMetrics(metric, 'last');
      console.log(hintsValue);
      for (const hintValue of hintsValue) {
        hints.push({
          label: hintValue.name,
          value: hintValue.valueRounded,
        });
      }
    }
    return hints;
}

// export function getMetricHints(data: PanelData): MetricHint[] {
//   const hints: MetricHint[] = [];
//   for (const metric of data.series) {
//     const hintValue = DataFrameToMetrics(metric, 'last')[0];
//     hints.push({
//       label: hintValue.name,
//       value: hintValue.value,
//     });
//   }
//   return hints;
// }
