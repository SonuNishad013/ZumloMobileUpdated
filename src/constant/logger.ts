/* eslint-disable no-console */
export const logger = (...item: any) => {
  __DEV__ && console?.log(...item);
};
export const loggerWithLevel = {
  ERROR: (...item: any) => console?.error(...item),
  LOG: (...item: any) => {
    __DEV__ && console?.log(...item);
  },
  WARN: (...item: any) => {
    __DEV__ && console?.warn(...item);
  },
};
export default logger;
