import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { Heading } from "~/components/heading/Heading";
import { useForm } from "~/common/hooks/useForm/useForm";

const Login = component$(() => {
  const initialValues = { email: "", password: "" };
  const { submitHandlers, Control, Form } = useForm(
    initialValues,
    "api/v1/auth/login"
  );

  return (
    <Layout>
      <Heading>Login</Heading>
      <Form>
        <Control name="email" label="Email">
          <Input />
        </Control>
        <Control name="password" label="Password">
          <Input type="password" />
        </Control>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "1rem",
            color: "darkslategray",
            fontWeight: "bold",
          }}
        >
          <Button {...submitHandlers}>Sign in</Button>
        </div>
      </Form>
      <a style={{ paddingTop: "0.6rem" }} href="/users/forgot">
        Forgot Password
      </a>
    </Layout>
  );
});

export default Login;
