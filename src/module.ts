import { PanelPlugin  } from '@grafana/data';
import { NewStatusOptions } from './types';
import { NewStatusPanel } from './components/NewStatusPanel';
import { RuleEditor } from './components/rules/RuleEditor';
import { RuleItemType } from './components/rules/types';
import * as cfg from './const';

export const plugin = new PanelPlugin<NewStatusOptions>(NewStatusPanel)
  .setPanelOptions((builder) => {
  return builder

    .addTextInput({
      path: 'panelName',
      name: 'Panel name',
      category: ['General'],
      defaultValue: 'ololo panel',
    })
    .addRadio({
      path: 'statePanel',
      defaultValue: 'enable',
      name: 'State panel',
      category: ['General'],
      settings: {
        options: [
          {
            value: 'enable',
            label: 'Enable',
          },
          {
            value: 'disable',
            label: 'Disable',
          },
          {
            value: 'na',
            label: 'N/A',
          },          
        ],
      },
//      showIf: config => config.showSeriesCount,
    })
    // .addUnitPicker({
    //   name: 'Unit',
    //   path: 'globalUnitFormat',
    //   defaultValue: 'short',
    //   category: ['General'],
    //   description: 'Use this unit format when it is not specified in overrides or detected in data',
    // })
    // .addNumberInput({
    //   name: 'Decimals',
    //   path: 'globalDecimals',
    //   description: 'Display specified number of decimals',
    //   defaultValue: 2,
    //   settings: {
    //     min: 0,
    //     integer: true,
    //   },
    //   category: ['General'],
    // })
    .addRadio({
      path: 'modePanel',
      defaultValue: 'line',
      name: 'Mode panel',
      category: ['General'],
      settings: {
        options: [
          {
            value: 'line',
            label: 'Line by line',
          },
          {
            value: 'in',
            label: 'In one line',
          },    
        ],
      },
//      showIf: config => config.showSeriesCount,
    })  
    .addBooleanSwitch({
      name: 'Blink',
      path: 'blink',
      defaultValue: true,
      category: ['General'],
    })

    .addTextInput({
      path: 'dataLink',
      name: 'DataLink',
      category: ['General'],
      description: 'Used on panel name if exist.\n\tExample: d/HQgMW5LVk/new-dashboard?orgId=1&refresh=30s&var-query0=$query0',
      defaultValue: '',
    })
    
    // .addSelect({
    //   name: 'Stat',
    //   path: 'globalOperator',
    //   description: 'Statistic to display',
    //   category: ['General'],
    //   defaultValue: OperatorOptions[0].value,
    //   settings: {
    //     options: OperatorOptions,
    //   },
    // })    
    .addColorPicker({
      name: 'OK Color (default: ' + cfg.ColorOK + ')',
      path: 'ColorOK',
      category: ['Color'],
      defaultValue: cfg.ColorOK,
      showIf: config => config.statePanel === 'enable',
    })
    .addColorPicker({
      name: 'Disable Color (default: ' + cfg.ColorDisable + ')',
      path: 'ColorDisable',
      category: ['Color'],
      defaultValue: cfg.ColorDisable,
    })
    .addColorPicker({
      name: 'Information Color (default: ' + cfg.ColorInformation + ')',
      path: 'ColorInformation',
      category: ['Color'],
      defaultValue: cfg.ColorInformation,
      showIf: config => config.statePanel === 'enable',
    })
    .addColorPicker({
      name: 'Warning Color (default: ' + cfg.ColorWarning + ')',
      path: 'ColorWarning',
      category: ['Color'],
      defaultValue: cfg.ColorWarning,
      showIf: config => config.statePanel === 'enable',
    })
    .addColorPicker({
      name: 'Average Color (default: ' + cfg.ColorAverage + ')',
      path: 'ColorAverage',
      category: ['Color'],
      defaultValue: cfg.ColorAverage,
      showIf: config => config.statePanel === 'enable',
    })
    .addColorPicker({
      name: 'High Color (default: ' + cfg.ColorHigh + ')',
      path: 'ColorHigh',
      category: ['Color'],
      defaultValue: cfg.ColorHigh,
      showIf: config => config.statePanel === 'enable',
    })
    .addColorPicker({
      name: 'Disaster Color (default: ' + cfg.ColorDisaster + ')',
      path: 'ColorDisaster',
      category: ['Color'],
      defaultValue: cfg.ColorDisaster,
      showIf: config => config.statePanel === 'enable',
    })
    .addColorPicker({
      name: 'N/A Color (default: ' + cfg.ColorNa + ')',
      path: 'ColorNa',
      category: ['Color'],
      defaultValue: cfg.ColorNa,
      showIf: config => config.statePanel === 'enable',
    })


     
  .addCustomEditor({
    name: 'Rules',
    id: 'ruleConfig',
    path: 'ruleConfig',
    editor: RuleEditor,
    defaultValue: {
      rule: [] as RuleItemType[],
      enabled: true,
      animationSpeed: '1500',
    },
    category: ['Rules'],
   });
});


