import {
    component$,
    JSXChildren,
    PropFunction,
    useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./button.css?inline";

export enum ButtonVariant {
    primary = "primary",
    secondary = "secondary",
}

interface ButtonProps {
    label?: JSXChildren;
    variant?: ButtonVariant;
    // onClick$?: PropFunction<() => void>;
    link: string
}

export const Button = component$(
    ({ label, variant = ButtonVariant.primary/*, onClick$,*/, link }: ButtonProps) => {
        useStylesScoped$(styles);
        return (
            // <button
            <div class={`default-button-styles ${variant}-button-styles`}>
                <a href={link} style={"color: #FFF; text-decoration: none"}

                // onClick$={onClick$}
                >
                    {label}
                    {/* </button> */}
                </a></div>
        );
    }
);
