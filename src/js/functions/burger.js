const burgers = document.querySelectorAll("[data-burger]");
if (burgers.length > 0) {
  burgers.forEach((burger) => {
    burger.addEventListener("click", (e) => {
      if (e.target.closest("[data-burger_button]") || !e.target.closest("[data-burger_body]") || (e.target.closest("a") && !e.target.closest("a").href.split("/")[e.target.closest("a").href.split("/").length - 1].includes(":"))) {
        burger.classList.toggle("_active");
        toggleScroll(document.body, true);
      }
    });
  });
}
