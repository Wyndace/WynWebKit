export default defineNuxtLink({
  componentName: "WWKLink",
  externalRelAttribute: "",
  prefetchedClass:
    "pb-[1px] bg-[position:50%_calc(100%-0px)] bg-gradient-to-r from-yellow-500 to-yellow-500 bg-no-repeat bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-500 ease-out",
  activeClass: "!bg-[length:100%_2px]",
  exactActiveClass: "",
})
