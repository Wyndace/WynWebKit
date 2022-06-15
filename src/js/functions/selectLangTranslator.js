export const selectLangIniter = (activeEl) => {
        const selectLang = document.querySelector("[data-select='lang']");
        selectLang.customSelect.value = activeEl.value;
    };
