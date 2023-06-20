import { component$ } from "@builder.io/qwik";
import { useForm } from "~/common/hooks/useForm/useForm";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { ResetPasswordPageData } from "~/models/User";

export const ResetPasswordPage = component$(
  ({ data }: { data: ResetPasswordPageData }) => {
    const initialValues = {
      password: "",
      passwordConfirm: "",
    };
    const { submitHandlers, Control, Form } = useForm(
      initialValues,
      `api/v1/users/reset?token=${data.token}`
    );
    return (
      <Layout>
        <Heading>Forgot Password</Heading>

        <Form>
          <Control name="password" label="Enter a new password">
            <Input type="password" />
          </Control>
          <Control name="passwordConfirm" label="Confirm password">
            <Input type="password" />
          </Control>
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
            <Button {...submitHandlers}>Submit</Button>
          </div>
        </Form>
      </Layout>
    );
  }
);
