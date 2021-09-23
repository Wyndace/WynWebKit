const getNumbers = (target) => {
  return target.replace(/\D/g, "");
}

const phoneMask = (e) => {
  let rawValue = e.target.value
  let phoneValue = getNumbers(rawValue);
  if (e.data == null && rawValue.length == 0) {
    return e.target.value == ""
  }
  if (e.data == "+") {
    return e.target.value = "+" + phoneValue;
  } else if (rawValue[0] != "+") {
    return e.target.value = "+" + phoneValue;
  }
  if (phoneValue.length == 0) {
    return e.target.value = (e.target.data == "+") ? "+" : "";
  } else if (phoneValue.length > 0) {
    return e.target.value = "+" + phoneValue
  }
};

const phoneInps = document.querySelectorAll('[data-form_input_tel]');

if (phoneInps.length > 0) {
  phoneInps.forEach(item => {
    item.addEventListener('input', phoneMask);
  });
}