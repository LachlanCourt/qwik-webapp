import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Input } from "~/components/input/Input";

const Login = component$(() => {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          background: "#DDDDFF",
          borderRadius: "0.3rem",
          boxShadow: "2px 3px 2px 1px rgb(0 0 0 / 20%)",
        }}
      >
        <div
          style={{
            paddingBottom: "2rem",
            fontSize: "2rem",
            color: "darkslategray",
            fontWeight: "bold",
          }}
        >
          Login
        </div>
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
      </div>
    </div>
  );
});

export default Login;
