const filterSearchParams = <T>(params: T): Partial<T> => {
  for (const prop in params) {
    const key = prop as keyof T;
    (!params[key] ?? true) && delete params[prop];
  }
  return params;
};

export default filterSearchParams;
