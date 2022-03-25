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

const moveAttributes = (from, to, deleteFrom = false) => {
  for (let index = 0; index < from.attributes.length; index++) {
    const attr = from.attributes.item(index);
    to.setAttribute(attr.name, attr.value);
  }
};
