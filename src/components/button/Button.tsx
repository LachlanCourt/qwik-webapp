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
  children?: JSXChildren;
  variant?: ButtonVariant;
  onClick$: PropFunction<() => void>;
}

export const Button = component$(
  ({ children, variant = ButtonVariant.primary, onClick$ }: ButtonProps) => {
    useStylesScoped$(styles);
    return (
      <button
        class={`default-button-styles ${variant}-button-styles`}
        onClick$={onClick$}
      >
        {children}
      </button>
    );
  }
);
