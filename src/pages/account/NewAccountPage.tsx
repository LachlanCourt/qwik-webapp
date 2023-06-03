import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Layout } from "~/components/layout/Layout";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";

const NewAccountPage = component$(() => {
  return (
    <Layout>
      <Heading>Create New Account</Heading>
      <Form action="/api/v1/accounts/new" method="POST">
        <FormControl>
          <label for="email-field">User Email</label>
          <Input name="email" id="email-field" />
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            color: "darkslategray",
            fontWeight: "bold",
            gap: "0.6rem",
          }}
        >
          <Button link="../" variant={ButtonVariant.SECONDARY}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </Form>
    </Layout>
  );
});

export default NewAccountPage;
