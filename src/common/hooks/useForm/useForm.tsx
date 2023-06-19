import {
  $,
  component$,
  useSignal,
  Signal,
  QRL,
  Component,
  Slot,
  useContextProvider,
  createContextId,
} from "@builder.io/qwik";
import { useLocation } from "../useLocation";
import { FormControl as StyledControl } from "./formControl/FormControl";
import { Form as StyledForm } from "./form/Form";
import { useNavigate } from "@builder.io/qwik-city";
import { HTTPMethod } from "~/common/constants";

interface FormType {
  [key: string]: any;
}
interface ControlProps {
  name: string;
  label: string;
  isVertical?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
}
interface FormAttributes<ResponseType> {
  returnData: Signal<ResponseType | null>;
  validationErrors: Signal<{ [key: string]: string }>;
  submitErrors: Signal<string | null>;
  formValues: Signal<FormType>;
  handleSubmit: QRL<() => void>;
  Control: Component<ControlProps>;
  Form: Component<{}>;
}
interface FormControlContextType {
  isDisabled: boolean;
  isRequired: boolean;
  isInvalid: boolean;
  value: any;
  handleChange: QRL<() => void>;
  name: string;
  id: string;
}

const isClientError = (status: number) => `${status}`.startsWith("4");

export const FormControlContext =
  createContextId<FormControlContextType>("FormControlContext");

interface FormContextType {}
export const FormContext = createContextId<FormContextType>("FormContext");

export const useForm = <ResponseType,>(
  intialValue: FormType,
  postUrl: string,
  validation?: object,
  method: HTTPMethod = HTTPMethod.POST
): FormAttributes<ResponseType> => {
  const location = useLocation();
  const nav = useNavigate();
  const formValues = useSignal(intialValue);
  const returnData = useSignal<ResponseType | null>(null);
  const validationErrors = useSignal<{ [key: string]: string }>({});
  const submitErrors = useSignal<string | null>(null);

  const handleSubmit = $(async () => {
    //TODO Run frontend validation here
    const valid = true;
    validationErrors.value = {};
    if (!valid) return;

    const body = new FormData();
    Object.entries(formValues.value).forEach(([key, value]) => {
      body.append(key, value);
    });

    const response = await fetch(`${location.formPostUrl}/${postUrl}`, {
      method,
      body,
      headers: { Accept: "text/html" },
    });
    if (response.redirected) await nav(response.url);

    if (!response.redirected && response.status == 200)
      returnData.value = await response.json();
    if (isClientError(response.status))
      submitErrors.value = await response.text();
  });

  const Form = component$(() => {
    return (
      <StyledForm>
        <Slot />
        {submitErrors.value}
      </StyledForm>
    );
  });

  const Control = component$(
    ({
      name,
      label,
      isVertical = false,
      isDisabled = false,
      isRequired = false,
      isInvalid = false,
    }: ControlProps) => {
      //TODO Run validation here to additionally calculate disabled/required/invalid according to validation schema
      const value = formValues.value[name];
      const handleChange = $((e: Event, target: HTMLInputElement) => {
        submitErrors.value = "";
        formValues.value = { ...formValues.value, [name]: target.value };
      });
      const fieldName = `${name}-field`;
      const contextData = {
        isDisabled,
        isRequired,
        isInvalid,
        value,
        handleChange,
        name: fieldName,
        id: fieldName,
      };
      useContextProvider(FormControlContext, contextData);
      return (
        <StyledControl isVertical={isVertical}>
          <label for={fieldName}>{label}</label>
          <Slot />
          {/* Errors here */}
        </StyledControl>
      );
    }
  );

  return {
    returnData,
    validationErrors,
    submitErrors,
    formValues,
    handleSubmit,
    Control,
    Form,
  };
};
