import { component$, Resource } from "@builder.io/qwik";
import { Button } from "~/components/button/Button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { AddUserData } from "~/models/AddUserData";

export const AddUserPage = component$(({ accountId }: AddUserData) => {
  return (
    <Layout>
      <Heading>Add User</Heading>

      <Form
        action={`/api/v1/users/adduser?accountId=${accountId}`}
        method="POST"
      >
        <FormControl isVertical>
          <label for="email-field">Enter the email address of the user and they will be emailed a sign up
            link</label>
          <Input name="email" id="email-field" />
        </FormControl>
        <Button type="submit">Send email</Button>
      </Form>
    </Layout>
  );
});
