import { createGlobalTheme } from "@vanilla-extract/css";

export const theme = createGlobalTheme(":root", {
    space: {
        sm: "0.3rem",
        md: "0.6rem",
        lg: "1rem",
    },
    colors: {
        black: "#000000",
        white: '#FFFFFF',
        grey: {
            100: '#e6e6e6',
            200: '#cccccc',
            300: '#b3b3b3',
            400: '#999999',
            500: '#808080',
            600: '#666666',
            700: '#4d4d4d',
            800: '#333333',
            900: '#1a1a1a'
        },
        purple: {
            100: '#f9aaea',
            200: '#f788e2',
            300: '#f565da',
            400: '#f243d2',
            500: '#f021ca',
            600: '#de0fb7',
            700: '#bc0d9b',
            800: '#990a7f',
            900: '#770863'
        }
    },
});