import { StyleRule } from "@vanilla-extract/css"

const formControlBaseStyle: StyleRule = {
    display: "flex",
    gap: " 0.6rem",
    justifyContent: "space-between",
    color: "darkslategray",
    fontWeight: "bold",
}

export const formControlHorizontalStyle: StyleRule = {
    ...formControlBaseStyle,
    flexDirection: 'row',
    alignItems: "center",
}

export const formControlVerticalStyle: StyleRule = {
    ...formControlBaseStyle,
    flexDirection: 'column',
    alignItems: "flex-start",
}