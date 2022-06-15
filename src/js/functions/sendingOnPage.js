import {changeMatch, createMatch} from "./_functions.js";

const validatePhone = (input) => {
  return !(changeMatch(input.value, "", /\D/g) === "" || changeMatch(input.value, "", /\D/g).length < 10);
};

const formAddError = (input) => {
  input.parentElement.classList.add("_error");
  input.classList.add("_error");
};

const formRemoveError = (input) => {
  input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
};

export const formValidate = (form) => {
  let error = 0;
  const formRequires = form.querySelectorAll("[data-form_require]");
  for (let index = 0; index < formRequires.length; index++) {
    const input = formRequires[index];
    formRemoveError(input);
    if (input.dataset.form_input_email != null) {
      if (!createMatch(input.value, /\S+@\S+\.\S+/)) {
        formAddError(input);
        ++error;
      }
    } else if (input.dataset.form_input_tel != null) {
      if (!validatePhone(input)) {
        formAddError(input);
        ++error;
      }
    } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
      formAddError(input);
      ++error;
    } else {
      if (input.value === "") {
        formAddError(input);
        ++error;
      }
    }
  }

  return error;
};

export default () => {
  const forms = document.querySelectorAll("[data-form]");
  if (forms.length > 0) {
    forms.forEach((form) => {
      async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        if (form.hasAttribute("data-survey")) {
          error = 0;
        }
        if (error === 0) {
          form.classList.add("_sending");
          if (form.dataset.test == null) {

            /*
              This is a backend part!!! If you do not add an attribute [data-test] or not to make a real empting of the letter, then will give an error and nothing happens
            */

            let response = await fetch(mail.php);

            if (response.ok) {
              let result = response.json;
              alert(result.message);
              form.reset();
            } else {
              alert("Something went wrong...");
            }
          } else {
            let result = {
              message: "All OK :Р",
            };
            alert(result.message);
            form.reset();
          }
          form.classList.remove("_sending");
        } else {
          alert("Fill the all fields!");
        }
      }

      form.addEventListener("submit", formSend);
    });
  }
}