import { FieldCalcs } from '@grafana/data';
import { MetricsModel } from 'types';

export function GetValueByOperator(
  metricName: string,
  data: MetricsModel | null,
  operatorName: string,
  calcs: FieldCalcs
) {
  switch (operatorName) {
    case 'name':
      return metricName;
    case 'last_time':
      if (data) {
        return data.timestamp;
      } else {
        return Date.now();
      }
    default:
      let aValue = calcs[operatorName];
      return aValue;
  }
}

