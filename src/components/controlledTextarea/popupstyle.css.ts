import { style } from "@vanilla-extract/css";
import { theme } from "~/common/styles/theme.css";

export const OptionStyle = style({
  cursor: "pointer",
  padding: "0.3rem",
  borderRadius: theme.borderRadius.sm,
  ":hover": {
    background: "#DDDDEE",
  },
  ":focus": {
    background: "#DDDDEE",
  },
  ":focus-visible": {
    outline: "none",
  },
});
