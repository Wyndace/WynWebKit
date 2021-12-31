const createMatch = (string, regex) => {
  return regex.test(string);
};

const parseBoolean = (value) => {
  if (typeof value === "string") {
    value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
    if (value === "true" || value === "false") return value === "true";
  }
  return;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
