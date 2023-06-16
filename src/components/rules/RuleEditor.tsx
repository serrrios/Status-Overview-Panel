////////////////////////////////////////////////////////////
// Original code by Grafana Polystat Panel https://github.com/grafana/grafana-polystat-panel/blob/main/src/components/composites/
// Edited by serrrios
////////////////////////////////////////////////////////////
import React, { useState } from 'react';
import { StandardEditorProps } from '@grafana/data';
import { Button, Collapse } from '@grafana/ui';

import { RuleItem } from './RuleItem';
import { DisplayModes, RuleItemType, RuleItemTracker, LogicalModes } from './types';
import { v4 as uuidv4 } from 'uuid';

export interface RuleEditorSettings {
  rules: RuleItemType[];
  enabled: boolean;
  animationSpeed: string;
}

interface Props extends StandardEditorProps<string | string[] | null, RuleEditorSettings> {}


export const RuleEditor: React.FC<Props> = ({ context, onChange }) => {
  const [settings] = useState(context.options.ruleConfig);
//  const [rulesEnabled, _setRulesEnabled] = useState(context.options.ruleConfig.enabled);
  const [tracker, _setTracker] = useState((): RuleItemTracker[] => {
    if (!settings.rules) {
      const empty: RuleItemTracker[] = [];
      return empty;
    }
    const items: RuleItemTracker[] = [];
    settings.rules.forEach((value: RuleItemType, index: number) => {
      items[index] = {
        rule: value,
        order: index,
        ID: uuidv4(),
      };
    });
    return items;
  });

  const setTracker = (v: RuleItemTracker[]) => {
    _setTracker(v);
    // update the panel config (only the rules themselves, not the tracker)
    const allRules: RuleItemType[] = [];
    v.forEach((element) => {
      allRules.push(element.rule);
    });
    const ruleConfig = {
      rules: allRules,
    };
    onChange(ruleConfig as any);
  };

  // tracks rule card collapse state
  const [isOpen, setIsOpen] = useState((): boolean[] => {
    if (!tracker) {
      const empty: boolean[] = [];
      return empty;
    }
    let size = tracker.length;
    const openStates: boolean[] = [];
    while (size--) {
      openStates[size] = false;
    }
    return openStates;
  });

  // generic move
  const arrayMove = (arr: any, oldIndex: number, newIndex: number) => {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  };

  const moveDown = (index: number) => {
    if (index !== tracker.length - 1) {
      arrayMove(tracker, index, index + 1);
      // reorder
      for (let i = 0; i < tracker.length; i++) {
        tracker[i].order = i;
        tracker[i].rule.order = i;
      }
      setTracker([...tracker]);
    }
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      arrayMove(tracker, index, index - 1);
      // reorder
      for (let i = 0; i < tracker.length; i++) {
        tracker[i].order = i;
        tracker[i].rule.order = i;
      }
      setTracker([...tracker]);
    }
  };

  const createDuplicate = (index: number) => {
    const original = tracker[index].rule;
    const order = tracker.length;
    const aRule: RuleItemType = {
      name: `${original.name} Copy`,
      label: `${original.name} Copy`,
      order: order,
      isTemplated: original.isTemplated,
      displayMode: original.displayMode,
      enabled: original.enabled,
      showName: original.showName,
      showValue: original.showValue,
      showRule: original.showRule,
      showMembers: original.showMembers,
      logicExpress: original.logicExpress,
      logicExpressValue: original.logicExpressValue,
      clickThrough: original.clickThrough,
      clickThroughOpenNewTab: original.clickThroughOpenNewTab,
      clickThroughSanitize: original.clickThroughSanitize,
      alias: original.alias,
      description: original.alias,
      shortAlias: original.shortAlias,
      seriesMatch: original.seriesMatch,
      logicalMode: original.logicalMode,
      numberThreshold: original.numberThreshold,
      stringThreshold: original.stringThreshold,
      showOnlyOnThreshold: original.showOnlyOnThreshold,
      revers: original.revers,      
    };
    const aTracker: RuleItemTracker = {
      rule: aRule,
      order: order,
      ID: uuidv4(),
    };
    setTracker([...tracker, aTracker]);
    setIsOpen([...isOpen, true]);
  };

  const updateRule = (index: number, value: RuleItemType) => {
    tracker[index].rule = value;
    setTracker([...tracker]);
  };


  const removeRule = (ruleIndex: number) => {
    // find the rule by the ruleIndex
    const allRules = [...tracker];
    let removeIndex = 0;
    for (let i = 0; i < allRules.length; i++) {
      if (allRules[i].order === ruleIndex) {
        removeIndex = i;
        break;
      }
    }
    allRules.splice(removeIndex, 1);
    // reorder
    //for (let i = 0; i < allRules.length; i++) {
    for (let i = 0; i < allRules.length; i++) {  
      allRules[i].order = i;
      allRules[i].rule.order = i;
    }
    setTracker([...allRules]);
  };

  const toggleOpener = (index: number) => {
    const toggleState = [...isOpen];
    toggleState[index] = !toggleState[index];
    setIsOpen([...toggleState]);
  };

  const addItem = () => {
    const order = tracker.length;
    const aRule: RuleItemType = {
      name: `Rule-${order}`,
      label: `Rule-${order}`,
      showName: true,
      showValue: true,
      showMembers: false,
      showOnlyOnThreshold: false,
      revers: false,      
      numberThreshold: {
        information: '',
        warning: '',
        average: '',
        high: '',
        disaster: '',
      },
      stringThreshold: {
        information: '',
        warning: '',
        average: '',
        high: '',
        disaster: '',
      },
      logicExpress: false,
      logicalMode: LogicalModes[0].value,
      logicExpressValue: '',
      showRule: true,
      isTemplated: false,
      enabled: true,
      displayMode: DisplayModes[0].value,
      clickThrough: '',
      clickThroughOpenNewTab: true,
      clickThroughSanitize: true,
      order: order,
      alias: '',
      description: '',
      shortAlias: '',
      seriesMatch: '',
    };
    const aTracker: RuleItemTracker = {
      rule: aRule,
      order: order,
      ID: uuidv4(),
    };
    setTracker([...tracker, aTracker]);
    // add an opener also
    setIsOpen([...isOpen, true]);
  };

  return (
    <>

      <Button style={{ marginBottom: '16px' }} fill="solid" variant="primary" icon="plus" onClick={addItem}>
        Add Rule
      </Button>
      {tracker &&
        tracker.map((item: RuleItemTracker, index: number) => {
          return (
            <Collapse
              key={`collapse-item-index-${item.ID}`}
              label={item.rule.name}
              isOpen={isOpen[index]}
              onToggle={() => toggleOpener(index)}
              collapsible
            >
              <RuleItem
                key={`rule-item-index-${item.ID}`}
                ID={item.ID}
                rule={item.rule}
                enabled={item.rule.enabled}
                setter={updateRule}
                remover={removeRule}
                moveUp={moveUp}
                moveDown={moveDown}
                createDuplicate={createDuplicate}
                context={context}
              />
            </Collapse>
          );
        })}
    </>
  );
};
