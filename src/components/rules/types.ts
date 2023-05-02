
import { SelectableValue } from '@grafana/data';


export interface RuleMember {}


export const DisplayModes: SelectableValue[] = [
  { value: 'number', label: 'Number threshold' },
  { value: 'string', label: 'String threshold' },
  { value: 'show', label: 'Show only ' },
];

export const LogicalModes: SelectableValue[] = [
  { value: 'eq', label: 'Equivalent' },
  { value: 'ne', label: 'Not equivalent' },
  { value: 'ge', label: 'Greater than' },
  { value: 'lt', label: 'Less than' },
];

export interface RuleItemType {
  name: string;
  label: string;
  order: number;
  isTemplated: boolean;
  displayMode: string;
  description?: string | '';
  enabled: boolean;
  showName: boolean;
  showValue: boolean;
  showRule: boolean;
  showMembers: boolean;
  showOnlyOnThreshold: boolean;
  revers: boolean;  
  numberThreshold: {
    information: string;
    warning: string;
    average: string;
    high: string;
    disaster: string;
  };
  stringThreshold: {
    information: string;
    warning: string;
    average: string;
    high: string;
    disaster: string;
  };
  clickThrough: string | '';
  clickThroughSanitize: boolean;
  clickThroughOpenNewTab: boolean;
  logicExpress: boolean;
  logicExpressValue: string;
  logicalMode: string; 
  seriesMatch: string | '';
  alias?: string | '';
  shortAlias?: string | '';
  ID?: string;
}

export interface RuleItemTracker {
  rule: RuleItemType;
  order: number;
  ID: string;
}

export interface RuleItemProps {
  rule: RuleItemType;
  ID: string;
  enabled: boolean;
  setter: any;
  remover: any;
  moveUp: any;
  moveDown: any;
  createDuplicate: any;
  context: any;
}

export interface RuleMetricItemProps {
  
  index: number;
  disabled: boolean;
  removeMetric: any;
  updateMetric: any;
  updateMetricAlias: any;
  context: any;
}
