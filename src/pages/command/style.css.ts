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
    borderRadius: theme.borderRadius.md,
    flexGrow: 1
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

export const CommandsList = style({
    listStyleType: 'none',
    paddingTop: theme.space.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.space.lg
})

export const CommandsListItem = style({
    background: `radial-gradient(${theme.colors.grey['800']}, ${theme.colors.grey['700']});`,
    borderRadius: theme.borderRadius.sm,
    boxShadow: theme.boxShadow.md,
    marginLeft: theme.space.xl,
    marginRight: theme.space.xl,
    padding: 0,
    ":hover": {
        background: `radial-gradient(${theme.colors.grey['700']}, ${theme.colors.grey['600']});`,
    },
    ":active": {
        background: theme.colors.grey['700']
    }
})

export const CommandsTile = style({
    padding: `${theme.space.xl} ${theme.space.lg}`,
    color: theme.colors.grey['100'],
    fontWeight: 'bold',
    textDecoration: 'none'
})