import { StyleRule } from "@vanilla-extract/css";

export const buttonBaseStyle: StyleRule = {
  fontSize: "1.2rem",
  outline: "none",
  border: "none",
  borderRadius: "0.3rem",
  padding: "0.3rem",
  cursor: "pointer",
  textDecoration: "none",
  fontWeight: "normal",
  fontFamily:
    "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

export const buttonPrimaryStyle: StyleRule = {
  ":visited": {
    color: "darkslategray",
  },
  color: "darkslategray",
  background: "#AAAAFF",
  border: "1px solid #9999EE",
  ":hover": {
    background: "#9999EE",
  },
};

export const buttonSecondaryStyle: StyleRule = {
  ":visited": {
    color: "darkslategray",
  },
  color: "darkslategray",
  background: "lightgrey",
  border: "1px solid slategray",
  ":hover": {
    color: "lightgrey",
    background: "slategray",
  },
};

export const inlineButtonMargin: StyleRule = {
  marginLeft: "0.3rem",
  marginRight: "0.3rem",
};
