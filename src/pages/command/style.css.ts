import { style } from "@vanilla-extract/css";
import { theme } from "~/common/styles/theme.css";

export const CommandStyle = style({
    background: theme.colors.grey['100'],
    borderRadius: '0.6rem',
    padding: '0.6rem',
    marginTop: '0.6rem'
})

export const CommandsContainer = style({
    background: theme.colors.grey['800'],
    boxShadow: theme.boxShadow.md,
    borderRadius: theme.borderRadius.md
})

export const CommandsHeader = style({
    color: theme.colors.black,
    fontSize: theme.fontSize.lg,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: theme.space.md
})

export const CommandsTitle = style({
    background: theme.colors.white,
    padding: `${theme.space.md} ${theme.space.xl}`,
    borderRadius: theme.borderRadius.md
})