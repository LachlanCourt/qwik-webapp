import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { ResetPasswordPageData } from "~/models/User";

export const ResetPasswordPage = component$(
  ({ data }: { data: ResetPasswordPageData }) => {
    return (
      <Layout>
        <Heading>Forgot Password</Heading>

        <Form method="POST" action={`/api/v1/users/reset?token=${data.token}`}>
          <FormControl>
            <label for="password-field">Enter a new password</label>
            <Input name="password" id="password-field" type="password" />
          </FormControl>
          <FormControl>
            <label for="password-confirm-field">Confirm password</label>
            <Input
              name="passwordConfirm"
              id="password-confirm-field"
              type="password"
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
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Layout>
    );
  }
);
