import { component$ } from "@builder.io/qwik";

const Login = component$(() => {
  return (
    <>
      <div>You gotta login</div>
      <form action="/api/v1/auth/login" method="POST">
        <label for="email-field">Email</label>
        <input name="email" id="email-field" />
        <label for="password-field">Password</label>
        <input name="password" id="password-field" type="password" />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
});

export default Login;
