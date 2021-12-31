
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
    return e.target.value = "+" + phoneValue.substring(0, 14);
  }
  if (phoneValue.length == 0) {
    return e.target.value = (e.target.data == "+") ? "+" : "";
  } else if (phoneValue.length > 0) {
    return e.target.value = "+" + phoneValue.substring(0, 14);
  }
};

const phoneInps = document.querySelectorAll('[data-form_input_tel]');

if (phoneInps.length > 0) {
  phoneInps.forEach(item => {
    item.addEventListener('input', phoneMask);
  });
}
