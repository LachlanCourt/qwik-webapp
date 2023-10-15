import { StyleRule } from "@vanilla-extract/css";
import { theme } from "~/common/styles/theme.css";

export const Dialog: StyleRule = {
  width: "92vw",
  height: "92vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

export const Container: StyleRule = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};
export const Wrapper: StyleRule = {
  background: "#DDDDFF",
  boxShadow: theme.boxShadow.md,
  borderRadius: theme.borderRadius.md,
};

export const Button: StyleRule = {
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: theme.space.sm,
  paddingRight: theme.space.sm,
};

export const Content: StyleRule = {
  padding: theme.space.xl,
  paddingTop: theme.space.sm,
};
