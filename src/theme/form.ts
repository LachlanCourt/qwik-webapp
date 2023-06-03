import { StyleRule } from "@vanilla-extract/css";

export const formStyle: StyleRule = {
    display: "flex",
    gap: "1rem",
    flexDirection: "column" as const,
}