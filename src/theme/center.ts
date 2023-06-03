import { StyleRule } from "@vanilla-extract/css";

export const centerContainer: StyleRule = {
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
};

export const centerWrapper: StyleRule = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  background: "#DDDDFF",
  borderRadius: "0.3rem",
  boxShadow: "2px 3px 2px 1px rgb(0 0 0 / 20%)",
};
