
export function getColorByState(state: string, options: any) {
    switch (state) {
      case 'ok-state':
        return options.ColorOK;
      case 'disaster-state':
        return options.ColorDisaster;
      case 'high-state':
        return options.ColorHigh;
      case 'average-state':
        return options.ColorAverage;
      case 'warning-state':
        return options.ColorWarning;
      case 'information-state':
        return options.ColorInformation;
      case 'disable-state':
        return options.ColorDisable;
      case 'na-state':
        return options.ColorNa;
      default:
        return 'rgba(0, 0, 0, 0)'; 
    }
}

