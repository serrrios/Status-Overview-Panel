//import { SelectableValue } from '@grafana/data';
import { RuleItemType } from './components/rules/types';

export interface NewStatusOptions {
  panelName: string;
  text: string;
  blink: boolean;
  statePanel: string;
  modePanel: string;
  globalOperator: string;
  ruleConfig: RuleConfig;
  dataLink: string;
}

export interface RuleConfig {
  rules: RuleItemType[];
}

export interface MetricHint {
  label: string;
  value: any;
}

export interface MetricsModel {
  //displayMode?: string;
  thresholdLevel?: number; // 0 = ok, 1 = warn, 2 = crit, 3 = unknown (same as sensu)
  value: number;
  valueFormatted: string;
  valueRounded: number;
  stats: any;
  name: string;
  displayName: string; // Used for composites
  timestamp: number;
  prefix: string;
  suffix: string;
  color: string;
  clickThrough: string;
  operatorName: string;
  newTabEnabled: boolean;
  sanitizedURL: string;
  sanitizeURLEnabled: boolean;
  showName: boolean;
  showValue: boolean;
  isComposite: boolean;
  members: MetricsModel[];
  triggerCache?: any; // holds animation frame info
}


// export const OperatorOptions: SelectableValue[] = [
//   { value: 'mean', label: 'Mean (avg)' },
//   { value: 'sum', label: 'Sum' },
//   { value: 'min', label: 'Min' },
//   { value: 'max', label: 'Max' },
//   { value: 'last', label: 'Last' },
//   { value: 'lastNotNull', label: 'Last Not Null' },
//   { value: 'first', label: 'First' },
//   { value: 'firstNotNull', label: 'First Not Null' },
//   { value: 'count', label: 'Count' },
//   { value: 'allIsNull', label: 'All Is Null (boolean)' },
//   { value: 'allIsZero', label: 'All Is Zero (boolean)' },
//   { value: 'delta', label: 'Delta' },
//   { value: 'diff', label: 'Difference' },
//   { value: 'diffperc', label: 'Difference (Percent)' },
//   { value: 'last_time', label: 'Time of Last Point' },
//   { value: 'logmin', label: 'Log Min' },
//   { value: 'name', label: 'Name' },
//   { value: 'nonNullCount', label: 'Non Null Count' },
//   { value: 'previousDeltaUp', label: 'Previous Delta Up' },
//   { value: 'range', label: 'Range' },
//   { value: 'step', label: 'Step' },
// ];


export const DisplayModes = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

