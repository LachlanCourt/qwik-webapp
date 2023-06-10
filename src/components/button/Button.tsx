import { component$, PropFunction, Slot } from "@builder.io/qwik";
import { ButtonBaseStyle, ButtonStyleVariants } from "~/theme/components.css";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface ButtonProps {
  variant?: ButtonVariant;
  onClick$?: PropFunction<() => void>;
  link?: string;
  [key: string]: any;
}

export const Button = component$(
  ({
    variant = ButtonVariant.PRIMARY,
    onClick$,
    link,
    ...props
  }: ButtonProps) => {
    const className = `${ButtonBaseStyle} ${ButtonStyleVariants[variant]}`;
    return (
      <>
        {link ? (
          <a class={className} href={link} {...props}>
            <Slot />
          </a>
        ) : (
          <button
            class={className}
            onClick$={() => onClick$ && onClick$()}
            {...props}
          >
            <Slot />
          </button>
        )}
      </>
    );
  }
);
