import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { Heading } from "~/components/heading/Heading";

const Login = component$(() => {
  return (
    <Layout>
      <Heading>Login</Heading>
      <Form action="/api/v1/auth/login" method="POST">
        <FormControl>
          <label for="email-field">Email</label>
          <Input name="email" id="email-field" />
        </FormControl>
        <FormControl>
          <label for="password-field">Password</label>
          <Input name="password" id="password-field" type="password" />
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            color: "darkslategray",
            fontWeight: "bold",
          }}
        >
          <Button type="submit">Sign in</Button>
        </div>
      </Form>
    </Layout>
  );
});

export default Login;
