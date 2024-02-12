const mergeClassNames = (
  ...classes: (string | boolean | undefined | null)[]
) => {
  return classes.filter(Boolean).join(" ");
};

export default mergeClassNames;
