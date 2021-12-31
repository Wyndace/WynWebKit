const validatePhone = (input) => {
  if (input.value.replace(/\D/g, "") == "" || input.value.replace(/\D/g, "").length < 10) {
    return false;
  } else {
    return true;
  }
};

const formAddError = (input) => {
  input.parentElement.classList.add("_error");
  input.classList.add("_error");
};

const formRemoveError = (input) => {
  input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
};

const formValidate = (form) => {
  let error = 0;
  const formReqiers = form.querySelectorAll("[data-form_require]");
  for (let index = 0; index < formReqiers.length; index++) {
    const input = formReqiers[index];
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

          let responce = await fetch(mail.php);

          if (responce.ok) {
            let result = responce.json;
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
