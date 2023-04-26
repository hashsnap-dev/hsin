import FormData from 'form-data';

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fdBody = (obj: {[key: string]: any}) => {
  const fd = new FormData();
  for (const key in obj) fd.append(key, obj[key]);
  return fd;
};

export const mkFunc = (f: Function) => async () => { try {
  await f();
} catch (error: any) {
  throw new Error(error);
}};

export const ignoreError = async (f: Function, ms: number = 1) => {
  while (1) {
    try {
      await f();
      break;
    } catch (err: any) {
      console.error(err.message);
      await sleep(ms);
    }
  } 
}; 

export const splitCustom = (str: string, val: string) => {
  const result = [];
  let cursor = 0;
  let prevCursor = 0;
  while (cursor < str.length) {
    let char = str[cursor];
    if (char === '(') {
      let depth = 1;
      while (depth) {
        char = str[++cursor];
        if (char === '(') depth += 1;
        else if (char === ')') depth -= 1;
      }
      char = str[++cursor];
    }
    if (char === val) {
      result.push(str.slice(prevCursor, cursor));
      prevCursor = cursor + 1;
    }
    cursor++;
  }
  result.push(str.slice(prevCursor));
  return result;
};

export type ParenthesisPosition = [number, number, ParenthesisPosition[]];
export const parenthesisParse = (str: string) => {
  let cursor = -1;
  const result: ParenthesisPosition[] = [];
  const stack: ParenthesisPosition[] = [];

  let error = '';
  while (!error) {
    if (!stack.length) {
      const startIndex = str.indexOf('(', cursor + 1);
      if (startIndex !== -1) {
        cursor = startIndex;
        stack.push([startIndex, -1, []]);
      } else {
        if (str.indexOf(')', cursor + 1) !== -1) error = 'Invalid parenthesis';
        break;
      }
    } else if (stack.length) {
      const nestedStartIndex = str.indexOf('(', cursor + 1);
      const endIndex = str.indexOf(')', cursor + 1);
      if (endIndex < nestedStartIndex || (endIndex !== -1 && nestedStartIndex === -1)) {
        cursor = endIndex;
        if (endIndex === -1) {
          error = 'Invalid parenthesis';
          break;
        }
        const target = stack.pop() as ParenthesisPosition;
        target[1] = endIndex;

        if (!stack.length) result.push(target);
      } else {
        cursor = nestedStartIndex;
        if (nestedStartIndex === -1) {
          error = 'Invalid parenthesis';
          break;
        }
        const target = [nestedStartIndex, -1, []] as ParenthesisPosition;
        stack[stack.length - 1][2].push(target);
        stack.push(target);
      }
    }
  }
  if (error) throw new Error(error);

  return result;
};

export const toUnique = <T>(arr: T[]) => [...new Set(arr)].sort(); 