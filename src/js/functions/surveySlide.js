const data = [
  {
    number: 1,
    title: "How do you like this plugin?",
    require: true,
    answer_alias: "quality",
    slideAnswers: [
      {
        answer_image: "https://fakeimg.pl/280x293/5ce1e6/fff/?text=surveySlide&font=Intro",
        answer_title: "Super",
        type: "radio",
      },
      {
        answer_image: "https://fakeimg.pl/280x293/5ce1e6/fff/?text=surveySlide&font=Intro",
        answer_title: "Steep",
        type: "radio",
      },
      {
        answer_image: "https://fakeimg.pl/280x293/5ce1e6/fff/?text=surveySlide&font=Intro",
        answer_title: "I have not seen anything better!",
        type: "radio",
      },
    ],
  },
  {
    number: 2,
    title: "What would you like to add?",
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
    title: "Leave your contacts and we will call you back",
    require: true,
    answer_alias: "contacts",
    slideAnswers: [
      {
        answer_title: "Enter your name",
        type: "text",
      },
      {
        answer_title: "Enter your mail",
        type: "email",
      },
      {
        answer_title: "Enter your phone",
        type: "tel",
      },
    ],
  },
];

const surveySlideValid = (slide) => {
  let error = 0;
  if (slide.hasAttribute("data-require")) {
    const fields = Array.prototype.slice.call(slide.querySelectorAll("input"));
    fields.push.apply(fields, Array.prototype.slice.call(slide.querySelectorAll("textarea")));
    console.log(fields);
    fields.forEach((field) => {
      field.setAttribute("data-require", "");
    });
  }
  return error;
};

const answersTemplateCreator = (data) => {
  const answersHTML = data.slideAnswers.map((item) => {
    return `
      <label>
      ${item.answer_image ? `<div class='img-wrapper'><img src="${item.answer_image}"></div>` : ""}
        ${item.type == "textarea" ? `${item.answer_title ? `<label>${item.answer_title}</label>` : ""} <textarea name="${data.answer_alias}"></textarea>` : item.type == "text" || item.type == "email" || item.type == "tel" ? `<label>${item.answer_title}</label><input name="${data.answer_alias}" type="${item.type}">` : `<input name="${data.answer_alias}" value="${item.answer_title}" type="${item.type}">`}
        ${item.answer_title && item.type != "text" && item.type != "email" && item.type != "tel" && item.type != "textarea" ? item.answer_title : ""}
      </label>
    `;
  });

  return answersHTML;
};

const slideTemplateCreator = (slides, currentSlide, data, dataLength, options) => {
  const { buttonSkipText, buttonNextText, buttonSubmitText } = options;
  slides.forEach((slide, index) => {
    const { title, require } = data[index];
    const slideAnswers = slide.querySelector("[data-survey_answers");
    if (slideAnswers) {
      slideAnswers.innerHTML = answersTemplateCreator(data[index]).join("");
      slide.querySelectorAll("[type='tel']").forEach((item) => {
        item.setAttribute("data-form_input_tel", "");
        item.addEventListener("input", phoneMask);
      });
      slide.querySelectorAll('[type="email"]').forEach((item) => {
        item.setAttribute("data-form_input_email", "");
      });
      if (slide.querySelector('[type="radio"]')) slide.querySelector('[type="radio"]').setAttribute("checked", "checked");
      if (require) {
        const fields = Array.prototype.slice.call(slide.querySelectorAll("input"));
        fields.push.apply(fields, Array.prototype.slice.call(slide.querySelectorAll("textarea")));
        fields.forEach((field) => {
          field.setAttribute("data-form_require", "");
        });
      }
    }

    const slideTitle = slide.querySelector("[data-survey_title]");

    if (slideTitle) {
      slideTitle.innerHTML = title;
    }

    const slideButton = slide.querySelector("[data-survey_button]");
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
    if (slide.dataset.survey_slide != "" && parseInt(slide.dataset.survey_slide) === currentSlide) {
      slide.classList.remove("_hidden");
    }

    const counter = document.querySelector("[data-survey_numbers]");
    if (counter) {
      if (counter.dataset.survey_numbers != "") counter.innerHTML = counter.dataset.survey_numbers.replace("current", currentSlide).replace("all", dataLength);
    }
    const surveyEnd = document.querySelector("[data-survey_end]");

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
      slideTemplateCreator(this.el.querySelectorAll(`[data-survey_slide]`), this.counter + 1, this.data, this.dataLength, this.options);
    }
  };

  events = () => {
    if (this.el) {
      this.el.addEventListener("click", (e) => {
        const currentSlide = this.el.querySelector(`[data-survey_slide="${this.data[this.counter].number}"]`);
        if (e.target == currentSlide.querySelector("[data-survey_button]")) this.click(e.target, currentSlide, this.options);
      });
    }
  };

  click = (surveyButton, currentSlide, options) => {
    // console.log(survey_button, options);
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
    currentSlide.parentNode.querySelector("[data-survey_numbers]").classList.add("_hidden");
    currentSlide.parentNode.querySelector("[data-survey_end]").classList.remove("_hidden");
    currentSlide.parentNode.querySelector("[data-survey_title]").classList.remove("_hidden");
    currentSlide.querySelector("[data-survey_button]").type = "submit";
  };
}

window.quiz = new surveySlide("[data-survey]", data, {
  buttonNextText: "Next",
  buttonSkipText: "Skip",
  buttonSubmitText: "Send",
});
