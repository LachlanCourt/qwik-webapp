import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

const NewAccountPage = component$(() => {
  const location = useLocation();
  return (
    <>
      <div>Create New Account</div>
      <form
        action={`/api/v1/accounts/${location.params.accountId}/commands/new`}
        method="POST"
      >
        <label for="command-name">Command Name</label>
        <input name="name" id="command-name" />
        <button type="submit">Create</button>
      </form>
    </>
  );
});

export default NewAccountPage;
