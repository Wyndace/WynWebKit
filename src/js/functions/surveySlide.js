const data = [
  {
    number: 1,
    title: "Как вам данный плагин?",
    require: true,
    answer_alias: "quality",
    slideAnswers: [
      {
        answer_image:
          "https://fakeimg.pl/280x293/5ce1e6/fff/?text=surveySlide&font=Intro",
        answer_title: "Супер",
        type: "radio",
      },
      {
        answer_image:
          "https://fakeimg.pl/280x293/5ce1e6/fff/?text=surveySlide&font=Intro",
        answer_title: "Крутой",
        type: "radio",
      },
      {
        answer_image:
          "https://fakeimg.pl/280x293/5ce1e6/fff/?text=surveySlide&font=Intro",
        answer_title: "Лучше него, ничего не видел!",
        type: "radio",
      },
    ],
  },
  {
    number: 2,
    title: "Что вы бы хотели дополнить?",
    require: true,
    answer_alias: "great",
    slideAnswers: [
      {
        type: "textarea",
      },
    ],
  },
  {
    number: 3,
    title: "Оставьте свои контакты, и мы вам перезвоним",
    require: true,
    answer_alias: "contacts",
    slideAnswers: [
      {
        answer_title: "Введите ваше имя",
        type: "text",
      },
      {
        answer_title: "Введите вашу почту",
        type: "email",
      },
      {
        answer_title: "Введите ваш телефон",
        type: "tel",
      },
    ],
  },
];

const surveySlideValid = (slide) => {
  let error = 0;
  if (slide.hasAttribute("data-require")) {
    const fields = Array.prototype.slice.call(slide.querySelectorAll("input"));
    fields.push.apply(
      fields,
      Array.prototype.slice.call(slide.querySelectorAll("textarea"))
    );
    console.log(fields);
    fields.forEach(field => {
    //   formRemoveError(field);
    //   if (field.tagName == "INPUT") {
    //     if (field.dataset.form_input_email != null) {
    //       if (!validateEmail(field.value)) {
    //         formAddError(field);
    //         ++error;
    //         console.log(`${(field, error)}`);
    //       } else if (field.dataset.form_input_tel != null) {
    //         if (!validatePhone(field)) {
    //           formAddError(field);
    //           ++error;
    //           console.log(`${(field, error)}`);
    //         }
    //       } else if (
    //         field.getAttribute("type") === "checkbox" &&
    //         !field.checked
    //       ) {
    //         formAddError(field);
    //         ++error;
    //         console.log(`${(field, error)}`);
    //       } else {
    //         if (field.value === "") {
    //           formAddError(field);
    //           ++error;
    //           console.log(`${(field, error)}`);
    //         }
    //       }
    //     }
    //   } else {
    //     console.log(field.value)
    //     if (field.value === "") {
    //       formAddError(field);
    //       ++error;
    //       console.log(`${(field, error)}`);
    //     }
    //   }
    field.setAttribute('data-require', '');
    });
  }
  return error;
};

const answersTemplateCreator = (data) => {
  const answersHTML = data.slideAnswers.map((item) => {
    return `
      <label>
      ${
        item.answer_image
          ? `<div class='img-wrapper'><img src="${item.answer_image}"></div>`
          : ""
      }
        ${
          item.type == "textarea"
            ? `${
                item.answer_title ? `<label>${item.answer_title}</label>` : ""
              } <textarea name="${data.answer_alias}"></textarea>`
            : item.type == "text" || item.type == "email" || item.type == "tel"
            ? `<label>${item.answer_title}</label><input name="${data.answer_alias}" type="${item.type}">`
            : `<input name="${data.answer_alias}" value="${item.answer_title}" type="${item.type}">`
        }
        ${
          item.answer_title &&
          item.type != "text" &&
          item.type != "email" &&
          item.type != "tel" &&
          item.type != "textarea"
            ? item.answer_title
            : ""
        }
      </label>
    `;
  });

  return answersHTML;
};

const slideTemplateCreator = (
  slides,
  currentSlide,
  data,
  dataLength,
  options
) => {
  const { buttonSkipText, buttonNextText, buttonSubmitText } = options;
  slides.forEach((slide, index) => {
    const { title, require } = data[index];
    const slideAnswers = slide.querySelector("[data-surveyAnswers");
    if (slideAnswers) {
      slideAnswers.innerHTML = answersTemplateCreator(data[index]).join("");
      slide.querySelectorAll("[type='tel']").forEach((item) => {
        item.setAttribute("data-form_input_tel", "");
        item.addEventListener('input', phoneMask);
      });
      slide.querySelectorAll('[type="email"]').forEach((item) => {
        item.setAttribute("data-form_input_email", "");
      });
      if (slide.querySelector('[type="radio"]'))
        slide
          .querySelector('[type="radio"]')
          .setAttribute("checked", "checked");
          if (require) {
            const fields = Array.prototype.slice.call(slide.querySelectorAll("input"));
            fields.push.apply(
              fields,
              Array.prototype.slice.call(slide.querySelectorAll("textarea"))
            );
            fields.forEach(field => {
              field.setAttribute('data-form_require', '') 
            });
          }
    }

    const slideTitle = slide.querySelector("[data-surveyTitle]");

    if (slideTitle) {
      slideTitle.innerHTML = title;
    }

    const slideButton = slide.querySelector("[data-surveyButton]");
    if (slideButton) {
      if (currentSlide != dataLength) {
        if (require) {
          slideButton.textContent = buttonNextText;
        } else {
          slideButton.textContent = buttonSkipText;
        }
      } else {
        slideButton.textContent = buttonSubmitText;
      }
    }

    slide.classList.add("_hidden");
    if (
      slide.dataset.surveyslide != "" &&
      parseInt(slide.dataset.surveyslide) === currentSlide
    ) {
      slide.classList.remove("_hidden");
    }

    const counter = document.querySelector("[data-surveyNumbers]");
    if (counter) {
      if (counter.dataset.surveynumbers != "")
        counter.innerHTML = counter.dataset.surveynumbers
          .replace("current", currentSlide)
          .replace("all", dataLength);
    }
    const surveyEnd = document.querySelector("[data-surveyEnd]");

    if (surveyEnd) {
      surveyEnd.classList.add("_hidden");
    }
  });
};

class surveySlide {
  constructor(selector, data, options) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.data = data;
    this.counter = 0;
    this.dataLength = this.data.length;
    this.result = new Array();
    this.init();
    this.events();
  }

  init = () => {
    if (this.el) {
      slideTemplateCreator(
        this.el.querySelectorAll(`[data-surveySlide]`),
        this.counter + 1,
        this.data,
        this.dataLength,
        this.options
      );
    }
  };

  events = () => {
    if (this.el) {
      this.el.addEventListener("click", (e) => {
        const currentSlide = this.el.querySelector(
          `[data-surveySlide="${this.data[this.counter].number}"]`
        );
        if (e.target == currentSlide.querySelector("[data-surveyButton]"))
          this.click(e.target, currentSlide, this.options);
      });
    }
  };

  click = (surveyButton, currentSlide, options) => {
    // console.log(surveyButton, options);
    const { buttonSkipText, buttonNextText, buttonSubmitText } = options;
    if (surveyButton.innerText == buttonNextText) {
      this.error = formValidate(currentSlide);
      console.log(this.error);
      if (this.error === 0) {
        this.nextSlide();
      }
    } else if (surveyButton.innerText == buttonSkipText) this.nextSlide();
    else if (surveyButton.innerText == buttonSubmitText) {
      this.error = formValidate(currentSlide);
      if (this.error === 0) {
        this.send(currentSlide);
      }
    }
  };

  nextSlide = () => {
    if (this.counter + 1 < this.dataLength) {
      this.counter += 1;
      this.init();
    }
  };

  send = (currentSlide) => {
    currentSlide.classList.add("_hidden");
    currentSlide.parentNode
      .querySelector("[data-surveyNumbers]")
      .classList.add("_hidden");
    currentSlide.parentNode
      .querySelector("[data-surveyEnd]")
      .classList.remove("_hidden");
    currentSlide.parentNode
      .querySelector("[data-surveyTitle]")
      .classList.remove("_hidden");
    currentSlide.querySelector("[data-surveyButton]").type = "submit";
  };
}

window.quiz = new surveySlide("[data-survey]", data, {
  buttonNextText: "Дальше",
  buttonSkipText: "Пропустить",
  buttonSubmitText: "Отправить",
});
