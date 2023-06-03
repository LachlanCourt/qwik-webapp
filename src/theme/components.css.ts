import { style } from "@vanilla-extract/css";
import {
  buttonBaseStyle,
  buttonPrimaryStyle,
  buttonSecondaryStyle,
} from "./button";
import { ButtonVariant } from "~/components/button/Button";
export const ButtonBaseStyle = style(buttonBaseStyle);
const _ButtonPrimaryStyle = style(buttonPrimaryStyle);
const _ButtonSecondaryStyle = style(buttonSecondaryStyle);
export const ButtonStyleVariants = { [ButtonVariant.PRIMARY]: _ButtonPrimaryStyle, [ButtonVariant.SECONDARY]: _ButtonSecondaryStyle }

import { centerContainer, centerWrapper, topContainer, topWrapper } from "./layout";
export const CenterContainer = style(centerContainer);
export const CenterWrapper = style(centerWrapper);
export const TopContainer = style(topContainer);
export const TopWrapper = style(topWrapper);

import { formStyle } from "./form";
export const FormStyle = style(formStyle);

import { formControlStyle } from "./formcontrol";
export const FormControlStyle = style(formControlStyle);

import { headingStyle } from "./heading";
export const HeadingStyle = style(headingStyle);

import { inputStyle } from "./input";
export const InputStyle = style(inputStyle);