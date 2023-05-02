interface Operators {
  [key: string]: (a: any, b: any) => boolean;
}
  
const operators: Operators = {
  'eq': (a: any, b: any) => a === b,
  'ne': (a: any, b: any) => a !== b,
  'ge': (a: any, b: any) => a > b,
  'lt': (a: any, b: any) => a < b,
};
  
export function compareValues(value1: any, value2: any, operator: string) {
  const operation = operators[operator];
  return operation ? operation(value1, value2) : false;
}

