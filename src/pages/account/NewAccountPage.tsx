import { component$ } from "@builder.io/qwik";

const NewAccountPage = component$(() => {
  return (
    <>
      <div>Create New Account</div>
      <form action="/api/v1/accounts/new" method="POST">
        <label for="email-field">User Email</label>
        <input name="email" id="email-field" />
        <button type="submit">Create</button>
      </form>
    </>
  );
});

export default NewAccountPage;
