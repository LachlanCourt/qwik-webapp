import {
  component$,
  JSXChildren,
  PropFunction,
  QwikIntrinsicElements,
  Slot,
  useStylesScoped$,
  QwikJSX,
} from "@builder.io/qwik";
import { ButtonStyle } from "./style.css";

export enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
}

interface ButtonProps {
  variant?: ButtonVariant;
  onClick$?: PropFunction<() => void>;
  link?: string;
  [key: string]: any;
}

export const Button = component$(
  ({
    variant = ButtonVariant.primary,
    onClick$,
    link,
    ...props
  }: ButtonProps) => {
    return link ? (
      <a class={ButtonStyle} href={link} {...props}>
        <Slot />
      </a>
    ) : (
      <button class={ButtonStyle} onClick$={onClick$} {...props}>
        <Slot />
      </button>
    );
  }
);
