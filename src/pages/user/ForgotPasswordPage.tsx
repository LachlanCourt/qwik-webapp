import { component$, useSignal, $ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { useForgotPassword } from "./hooks/useForgotPassword";

export const ForgotPasswordPage = component$(() => {
  const submitted = useSignal(false);
  const submitResetRequest = useForgotPassword(submitted);
  const emailInput = useSignal("");
  const handleInput = $((event: Event, target: HTMLInputElement) => {
    emailInput.value = target.value;
    submitted.value = false;
  });

  return (
    <Layout>
      <Heading>Forgot Password</Heading>

      <FormControl isVertical>
        <label for="email-field">Enter your email address</label>
        <Input
          name="email"
          id="email-field"
          type="email"
          style={{ width: "100%" }}
          value={emailInput.value}
          onInput$={handleInput}
        />
      </FormControl>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Button link={"../"} variant={ButtonVariant.SECONDARY}>
          Cancel
        </Button>
        <Button onClick$={() => submitResetRequest(emailInput.value)}>
          Send email
        </Button>
      </div>
      {submitted.value && (
        <div style={{ fontSize: "0.6rem", maxWidth: "10rem" }}>
          If your account exists, an email has been sent to the specified
          address
        </div>
      )}
    </Layout>
  );
});
