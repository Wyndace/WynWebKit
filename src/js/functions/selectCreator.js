import {createMatch} from "./_functions.js";

export default () => {
    const selects = document.querySelectorAll("[data-select]");
    if (selects.length > 0) {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            if (select.dataset.select != null) {
                if (select.dataset.select === "" || select.dataset.select === "default") customSelect(select);
                if (select.dataset.select === "lang") {
                    customSelect(select);
                    let needClass = [];
                    const customSelects = document.querySelectorAll(".customSelect");
                    if (customSelects.length > 0) {
                        customSelects.forEach((customSel) => {
                            if (customSel.dataset.select === "lang") {
                                needClass.push(customSel);
                                for (let z = 0; z < customSel.children.length; z++) {
                                    const child = customSel.children.item(z);
                                    if (createMatch(child.classList.value, /custom-select/) && !createMatch(child.classList.value, /custom-select-lang/)) {
                                        needClass.push(child);
                                        for (let z = 0; z < child.children.length; z++) {
                                            const childOfChild = child.children.item(z);
                                            if (createMatch(childOfChild.classList.value, /custom-select/) && !createMatch(childOfChild.classList.value, /custom-select-lang/)) {
                                                needClass.push(childOfChild);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        needClass.forEach((needy) => {
                            let oldClass = needy.classList.value.split("custom-select");
                            let newClass = [];
                            oldClass.forEach((elClass) => {
                                elClass = elClass.split(" ");
                                if (elClass[0] !== "") newClass.push("custom-select-lang" + elClass[0]);
                            });
                            newClass.forEach((elClass) => {
                                // if (elClass == "custom-select-lang-panel") needy.setAttribute("data-da", ".menu-burger__body, 768, last");
                                needy.classList.add(elClass);
                            });
                        });
                    }
                }
            }
        }
    }
};