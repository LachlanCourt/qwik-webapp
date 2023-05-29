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

export const ButtonStyle = style({
  fontSize: "1.2rem",
  outline: "none",
  border: "none",
  background: "#AAAAFF",
  borderRadius: "0.3rem",
  padding: "0.3rem",
  color: "#333399",
  cursor: "pointer",
  ":hover": {
    background: "#9999EE",
  },
});
