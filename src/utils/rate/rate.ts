export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const rateLimiter = async (fn: () => Promise<any>, limit: number, interval: number) => {
  let count = 0;
  const limitedFn = async () => {
    if (count >= limit) {
      await sleep(interval);
      count = 0;
    }
    count++;
    return fn();
  };
  return limitedFn;
};
