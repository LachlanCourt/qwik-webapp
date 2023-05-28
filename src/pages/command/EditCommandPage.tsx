import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Command } from "@prisma/client";

const EditCommandPage = component$(({ data }: { data?: Command }) => {
  const location = useLocation();

  const postEndpoint = data?.id ? `${data.id}` : `new`;

  return (
    <>
      <div>Create New Account</div>
      <form
        action={`/api/v1/accounts/${location.params.accountId}/commands/${postEndpoint}`}
        method="POST"
      >
        <label for="command-name">Command Name</label>
        <input name="name" id="command-name" value={data?.name} />
        <label for="command-response">Command Response</label>
        <input name="response" id="command-response" value={data?.response} />
        <button type="submit">Create</button>
      </form>
    </>
  );
});

export default EditCommandPage;
