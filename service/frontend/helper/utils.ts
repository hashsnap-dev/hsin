import localforage from 'localforage';
import { useRouter } from 'next/router';
import {
  DependencyList,
  Ref,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export const createPaginationIndex = (
  currentPage: number,
  total: number,
  limit = 10,
  listLength = 10
) => {
  const totalPages = Math.ceil(total / limit);
  const startSetIndex = Math.floor((currentPage - 1) / listLength);
  const startList = listLength * startSetIndex + 1;

  const length =
    startList + listLength - 1 > totalPages
      ? listLength - (startList + listLength - 1 - totalPages)
      : listLength;

  return {
    isFirst: currentPage <= listLength,
    isLast: startList + listLength - 1 > totalPages,
    items: Array.from({ length }, (_, i) => {
      return startList + i;
    }),
    first: 1,
    last: totalPages,
    prevFirst: startList - listLength,
    nextFirst: startList + listLength,
  };
};
export const createRangePagination = (
  page: number,
  limit: number,
  total: number,
  range: number
) => {
  const size = range * 2 + 1;
  const maxPage = Math.ceil(total / limit);
  const start =
    range >= page
      ? 1
      : maxPage - range < page
      ? maxPage - size + 1
      : page - range;
  const end =
    size > page + range
      ? size
      : maxPage < page + range
      ? maxPage
      : page + range;
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};
export const unique = <T>(arr: T[]) => [...new Set(arr)];

export const useOutsideClick = (f: Function, ref: RefObject<any>) => {
  useEffect(() => {
    const handler = (ev: any) => {
      if (ref?.current && !ref?.current.contains(ev.target)) {
        f(ev);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [ref]);
};
export const useOutsideMove = <T extends RefObject<any>>(
  f: (ref: T, index: number) => void,
  ...refs: T[]
) => {
  useEffect(() => {
    const handler = (ev: { pageX: number; pageY: number }) => {
      const { pageX, pageY } = ev;
      const index = refs.findIndex((ref) => {
        if (!ref.current) return;
        const { x, y, width, height } = ref.current.getBoundingClientRect();
        if (
          x <= pageX &&
          x + width <= pageX &&
          y <= pageY &&
          y + height <= pageY
        )
          return true;
      });
      f(refs[index], index);
    };
    document.addEventListener('pointermove', handler);
    return () => document.removeEventListener('pointermove', handler);
  }, refs);
};

export const useQuery = ({ page = 1, total = 3000, limit = 12 } = {}) => {
  const { query } = useRouter();
  page = (query.page && Number(query.page)) || page;
  limit = (query.limit && Number(query.limit)) || limit;
  total = (query.total && Number(query.total)) || total;

  const type = !query.type
    ? null
    : Number.isNaN(Number(query.type))
    ? null
    : Number(query.type);

  const consonant = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'
    .split('')
    .includes(query.consonant as any)
    ? query.consonant
    : '';

  return {
    page,
    total,
    limit,
    type,
    consonant,
  };
};

export const omit = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
  const cloneObject = { ...obj };
  delete cloneObject[key];
  return cloneObject;
};

export const merge = <T, K>(a: T, b: K): T & K => {
  return { ...a, ...b };
};

// https://stackoverflow.com/a/67243723/16962686
export const kebabize = (str: string) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  );

export const fillEmpty = <T, K>(arr: T[], size: number, empty: K) => {
  return (arr as (T | K)[]).concat(
    Array.from({ length: (size - (arr.length % size)) % size }, () => empty)
  );
};

// https://stackoverflow.com/questions/6251463/regex-capitalize-first-letter-every-word-also-after-a-special-character-like-a
export const firstLetterUpperCase = (str: string) => {
  const regex = /(\b[a-z](?!\s))/g;
  return str.replace(regex, (x) => x.toUpperCase());
};

export const obj2params = (obj: {}) =>
  Object.entries(obj)
    .filter(([key, val]) => val !== null && val !== undefined && val !== '')
    .map(([key, val]) => key + '=' + encodeURI(val as string))
    .join('&');

export const useStateByEffect = <T extends any>(
  f: () => T,
  deps: DependencyList,
  defaultValue: T
) => {
  const [state, setState] = useState(defaultValue);
  useEffect(() => {
    setState(f());
  }, deps);

  return [state, setState] as const;
};

export const debounce = <T extends any[]>(
  f: (...args: T) => void,
  ms: number
) => {
  let timer: number;
  return (...params: T) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(f, ms, ...params) as any;
  };
};

// https://github.com/vercel/swr/issues/110#issuecomment-552637429
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useLocalForge = <T>(key: string, defaultValue: T) => {
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    (async () => {
      try {
        const data = await localforage.getItem<T>(key);
        if (data) setData(data);
      } catch (err: any) {}
    })();
  }, []);

  const setItem = async (val: SetStateAction<T>) => {
    try {
      await localforage.setItem(
        key,
        typeof val === 'function' ? (val as any)(data) : val
      );
      setData(val);
    } catch (err: any) {}
  };

  return [data, setItem] as const;
};

export const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const dateFormat = (str: string) => {
  const d = new Date(str);
  const date = [
    d.getFullYear(),
    (d.getMonth() + 1 + '').padStart(2, '0'),
    (d.getDate() + '').padStart(2, '0'),
  ].join('.');
  return date;
};

export function* backTracking<T extends any[]>(...args: T[]) {
  const r = [[]] as T[][];
  while (r.length) {
    const t = r.shift() as T[];
    if (t.length === args.length) yield t;
    else r.unshift(...(args[t.length] as T[]).map((i) => [...t, i]));
  }
}
