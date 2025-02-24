import { defineMermaidSetup } from "@slidev/types";

export default defineMermaidSetup(() => {
  return {
    fontFamily: "BIZ UDPGothic",
    fontSize: 20,
    sequence: {
      width: 550,
      messageFontWeight: 900,
    },
  };
});
