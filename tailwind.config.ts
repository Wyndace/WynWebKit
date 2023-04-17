import type { Config } from "tailwindcss"

export default <Partial<Config>>{
  plugins: [require("flowbite")],
  content: ["./node_modules/flowbite.{js,ts}"],
}
