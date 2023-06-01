import { component$, PropFunction, Slot } from "@builder.io/qwik";
import {
  BaseButtonStyle,
  PrimaryButtonStyle,
  SecondaryButtonStyle,
} from "./style.css";

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
    const variantMap = {
      [ButtonVariant.PRIMARY]: PrimaryButtonStyle,
      [ButtonVariant.SECONDARY]: SecondaryButtonStyle,
    };

    const className = `${BaseButtonStyle} ${variantMap[variant]}`;
    return link ? (
      <a class={className} href={link} {...props}>
        <Slot />
      </a>
    ) : (
      <button class={className} onClick$={onClick$} {...props}>
        <Slot />
      </button>
    );
  }
);
