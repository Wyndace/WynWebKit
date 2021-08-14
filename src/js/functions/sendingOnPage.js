// === sendingOnPage ==================================================================================================================================================

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const validatePhone = (input) => {
  if (input.value.replace(/\D/g, '') == '') {
    return false
  } else {
    return true;
  }
}

const formAddError = (input) => {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
}

const formRemoveError = (input) => {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
}

const formValidate = (form) => {
  let error = 0;
  const formReqiers = form.querySelectorAll('[data-form_require]');
  console.log(formReqiers)
  for (let index = 0; index < formReqiers.length; index++) {
    const input = formReqiers[index];
    formRemoveError(input);
    if (input.dataset.form_input_email != null) {
      if (!validateEmail(input.value)) {
        formAddError(input);
        ++error
      }
    } else if (input.dataset.form_input_tel != null) {
      if (!validatePhone(input)) {
        formAddError(input);
        ++error
        console.log(error)
      }
    } else if (input.getAttribute('type') === 'checkbox' && !input.checked) {
      formAddError(input);
      ++error
    } else {
      if (input.value === '') {
        formAddError(input);
        ++error;
      }
    }
  }

  return error
}
const forms = document.querySelectorAll('[data-form]');
console.log(forms)
if (forms.length > 0) {
  forms.forEach(form => {

    async function formSend(e) {
      e.preventDefault();
      let error = formValidate(form);
      if (error === 0) {
        form.classList.add('_sending');
        if (form.dataset.test == null) {

// ЭТО БЕКЕНД ЧАСТЬ!!! ЕСЛИ НЕ ДОБАВИТЬ АТТРИБУТ [data-test] ИЛИ ЖЕ НЕ СДЕЛАТЬ РЕАЛЬНУЮ ОПТРАВКУ ПИСЬМА, ТО БУДЕТ ВЫДАВАТЬ ОШИБКУ И НИЧЕГО НЕ ПРОИЗОЙДЁТ ==============

          let responce = await fetch(mail.php);

          if (responce.ok) {
            let result = responce.json;
            alert(result.message);
            form.reset();
          } else {
            alert('Что пошло не так...')
          }

// ====================================================================================================================================================================

        } else {
          let result = {
            message: 'Всё ок :Р'
          };
          alert(result.message);
          form.reset();
        }
form.classList.remove('_sending');
      } else {
        alert('Заполните поля!')
      }
    }

    form.addEventListener("submit", formSend);
  });
}

// ====================================================================================================================================================================