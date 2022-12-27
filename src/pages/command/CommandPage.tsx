import { component$, Resource } from "@builder.io/qwik";
import { Link, useEndpoint, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { CommandData } from "~/models";

export const CommandPage = component$(({ data }: { data: CommandData }) => {
  const nav = useNavigate();
  return (
    <>
      <Button
        onClick$={() => {
          nav.path = `/accounts/${data.accountId}/commands`;
        }}
      >
        Back
      </Button>

      <div>
        {data.commandId}: {data.name}, account: {data.accountId}
      </div>
    </>
  );
});

export const CommandResource = component$(() => {
  const resource = useEndpoint<CommandData>();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <CommandPage data={data} />}
    />
  );
});
