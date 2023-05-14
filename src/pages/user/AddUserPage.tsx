import { component$, Resource } from "@builder.io/qwik";
import { AddUserData } from "~/models/AddUserData";

export const AddUserPage = component$(({ accountId }: AddUserData) => {
  return (
    <>
      <div>
        Enter the email address of the user and they will be emailed a sign up
        link
      </div>
      <form
        action={`/api/v1/users/adduser?accountId=${accountId}`}
        method="POST"
      >
        <label for="email-field">Email</label>
        <input name="email" id="email-field" />
        <button type="submit">Send email</button>
      </form>
    </>
  );
});
