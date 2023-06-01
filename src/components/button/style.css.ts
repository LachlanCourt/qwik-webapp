/* .default-button-styles {
    border-radius: 0.6rem;
    padding: 0.6rem;
    width: fit-content
}

.default-button-styles:hover {
    cursor: pointer;
}

.primary-button-styles {
    background: linear-gradient(45deg, #bb00bb, #ee00ee);
    color: #fff;
}

.primary-button-styles:hover {
    background: linear-gradient(45deg, #aa00aa, #dd00dd);
}

.primary-button-styles:active {
    background: linear-gradient(45deg, #990099, #cc00cc);
} */
import { style } from "@vanilla-extract/css";
import { theme } from "~/common/styles/theme.css";

export const BaseButtonStyle = style({
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
});

export const PrimaryButtonStyle = style({
  ":visited": {
    color: "darkslategray",
  },
  color: "darkslategray",
  background: "#AAAAFF",
  border: "1px solid #9999EE",
  ":hover": {
    background: "#9999EE",
  },
});

export const SecondaryButtonStyle = style({
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
});
