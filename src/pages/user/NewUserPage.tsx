import { component$, Resource } from "@builder.io/qwik";
import { NewUserData } from "~/models";

export const NewUserPage = component$(({ data }: { data: NewUserData }) => {
  //TODO should we ask for email again?
  return (
    <>
      <div>
        Welcome! We've already got your email address, just need a secure
        password to keep your data safe
      </div>
      <form action={`/api/v1/users/new?token=${data.token}`} method="POST">
        <label for="password-field">Password</label>
        <input name="password" id="password-field" type="password" />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
});
