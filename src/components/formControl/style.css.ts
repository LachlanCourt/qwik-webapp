import { style } from "@vanilla-extract/css";
import { theme } from "~/common/styles/theme.css";

export const FormControlStyle = style({
  display: "flex",
  gap: " 0.6rem",
  justifyContent: "space-between",
  alignItems: "center",
  color: "darkslategray",
  fontWeight: "bold",
});
