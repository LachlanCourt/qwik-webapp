import { style } from "@vanilla-extract/css";
import { theme } from "~/common/styles/theme.css";

export const CenterContainer = style({
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
});

export const CenterWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  background: "#DDDDFF",
  borderRadius: "0.3rem",
  boxShadow: "2px 3px 2px 1px rgb(0 0 0 / 20%)",
});
