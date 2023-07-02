import { StyleRule } from "@vanilla-extract/css";

export const textareaStyle: StyleRule = {
  border: "1px solid gray",
  borderRadius: "0.3rem",
  padding: "0.3rem",
  background: " #EEEEFF",
  boxShadow: " 2px 3px 2px 1px rgb(0 0 0 / 20%)",

  width: '500px',
  //@ts-ignore
  "@media (max-width: 680px)": {
    width: '260px'
  },
  //@ts-ignore
  "@media (max-width: 430px)": {
    width: '295px'
  }
};
