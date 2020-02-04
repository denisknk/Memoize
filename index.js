export default function memoize(fn) {
  const cache = [];

  function compareArgs(oldArgs, newArgs) {
    let match = true;
    if (oldArgs.length === 0 && newArgs.length === 0) {
      return true;
    }
    if (oldArgs.length !== newArgs.length) {
      return false;
    }
    oldArgs.forEach((item, index) => {
      const newArg = newArgs[index];
      if (item !== newArg) {
        match = false;
      }
    });
    return match;
  }
  return (...args) => {
    let cachedValue;
    const hasCached = cache.reduce((acc, memoObject) => {
      if (!acc) {
        const oldArgs = memoObject.args;
        if (compareArgs(oldArgs, args)) {
          // console.log(memoObject.result);
          cachedValue = memoObject.result;
          return true;
        }
        return false;
      }

      return acc;
    }, false);
    if (hasCached) {
      return cachedValue;
    }
    const result = fn(...args);
    cache.push({ args, result });
    return result;
  };
}
