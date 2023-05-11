////////////////////////////////////////////////////////////
// Original code by Grafana Polystat Panel https://github.com/grafana/grafana-polystat-panel/
// Edited by serrrios
////////////////////////////////////////////////////////////import { MetricsModel } from 'types';
import { InsertTime } from './deframer';
import { GetValueByOperator } from './stats';
import { PanelData, DataFrame, Field, FieldType, reduceField, getFieldDisplayName, getValueFormat, formattedValueToString } from '@grafana/data';

export function ProcessDataFrames(
    data: PanelData,
    globalOperator: string,
  ): MetricsModel[] {
    // check if data contains a field ca  lled Time of type time
    let processedData = InsertTime(data.series);
    let internalData = [] as MetricsModel[];
    // just one for now...
    processedData.map((item) => {
      const models = DataFrameToMetrics(item, globalOperator);
      for (const aModel of models) {
        internalData.push(aModel);
      }
    });
    return internalData;
  }
  
  export function DataFrameToMetrics(frame: DataFrame, globalOperator: string): MetricsModel[] {
  
    const valueFields: Field[] = [];
  
    for (const aField of frame.fields) {
      //console.log("aField: ", aField);
      if (aField.type === FieldType.number || aField.type === FieldType.string) {
        valueFields.push(aField);
      }
    }
    const models: MetricsModel[] = [];
  
    for (const valueField of valueFields) {
      const standardCalcs = reduceField({ field: valueField!, reducers: ['bogus'] });
      
      const valueFieldName = getFieldDisplayName(valueField!, frame);
      const operatorValue = GetValueByOperator(valueFieldName, null, globalOperator, standardCalcs);
  
      let maxDecimals = 4;
      if (valueField!.config.decimals !== undefined && valueField!.config.decimals !== null) {
        maxDecimals = valueField!.config.decimals;
      }
      const result = getValueFormat(valueField!.config.unit)(operatorValue, maxDecimals, undefined, undefined);
      const valueFormatted = formattedValueToString(result);
  
      const model: MetricsModel = {
        thresholdLevel: 0,
        value: operatorValue,
        valueFormatted: valueFormatted,
        valueRounded: roundValue(operatorValue, maxDecimals) || operatorValue,
        stats: standardCalcs,
        name: valueFieldName, // aSeries.name,
        displayName: valueFieldName, // aSeries.name,
        timestamp: 0,
        prefix: '',
        suffix: '',
        color: '',
        clickThrough: '',
        operatorName: '',
        newTabEnabled: true,
        sanitizedURL: '',
        sanitizeURLEnabled: true,
        showName: true,
        showValue: true,
        isComposite: false,
        members: [],
      };
      models.push(model);
    }
    return models;
  }
  
  const roundValue = (num: number, decimals: number) => {
    if (num === null) {
      return null;
    }
    const n = Math.pow(10, decimals);
    const formatted = (n * num).toFixed(decimals);
    return Math.round(parseFloat(formatted)) / n;
  };

