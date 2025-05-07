import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },

  "body, input, textarea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },

  ".scroll": {
    overflow: "scroll",
  },
  ".scroll::-webkit-scrollbar": {
    width: "12px",
  },

  ".scroll::-webkit-scrollbar-track": {
    borderRadius: "10px",
  },

  ".scroll::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    "-webkit-box-shadow": "inset 0 0 2px rgba(0, 0, 0, 0.5)",
  },
});
