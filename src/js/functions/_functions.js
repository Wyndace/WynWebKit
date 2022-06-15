export const createMatch = (string, regex) => {
  return regex.test(string);
};

export const changeMatch = (oldString, newString, regex) => {
  return oldString.replace(regex, newString);
}

export const parseBoolean = (value) => {
  if (typeof value === "string") {
    value = value.replace(/^\s+|\s+$/g, "").toLowerCase();
    if (value === "true" || value === "false") return value === "true";
  }
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const moveAttributes = (from, to, deleteFrom = false) => {
  for (let index = 0; index < from.attributes.length; index++) {
    const attr = from.attributes.item(index);
    to.setAttribute(attr.name, attr.value);
  }
};
