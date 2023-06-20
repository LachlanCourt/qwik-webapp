import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { useForm } from "~/common/hooks/useForm/useForm";

export const ForgotPasswordPage = component$(() => {
  const initialValues = {
    email: "",
  };
  const { returnData, submitHandlers, Control, Form } = useForm<{
    message: string;
  }>(initialValues, "api/v1/users/forgot");

  return (
    <Layout>
      <Heading>Forgot Password</Heading>
      <Form>
        <Control isVertical name="email" label="Enter your email address">
          <Input type="email" style={{ width: "100%" }} />
        </Control>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Button link={"/login"} variant={ButtonVariant.SECONDARY}>
          Cancel
        </Button>
        <Button {...submitHandlers}>Send email</Button>
      </div>
      {returnData.value && (
        <div style={{ fontSize: "0.6rem", maxWidth: "10rem" }}>
          {returnData.value.message}
        </div>
      )}
    </Layout>
  );
});
