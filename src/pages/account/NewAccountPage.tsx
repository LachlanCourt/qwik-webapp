import { component$ } from "@builder.io/qwik";

const NewAccountPage = component$(() => {
  return (
    <>
      <div>Create New Account</div>
      <form action="/api/v1/accounts/new" method="POST">
        <label for="account-name">Account Name</label>
        <input name="name" id="account-name" />
        <label for="admin-id">Admin ID</label>
        <input name="adminId" id="admin-id" />
        <button type="submit">Create</button>
      </form>
    </>
  );
});

export default NewAccountPage;
