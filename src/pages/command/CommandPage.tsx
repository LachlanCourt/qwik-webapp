import { component$, Resource, $ } from "@builder.io/qwik";
import { useEndpoint, useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { CommandData } from "~/models";
import { CommandStyle } from "./commands.css";

export const CommandPage = component$(({ data }: { data: CommandData }) => {
  const nav = useNavigate();



  return (
    <>
      <Button
        // HACK UNTIL QWIK STOPS PULLING PRISMA TO THE CLIENT
        // onClick$={() => {
        //   nav.path = `/accounts/${data.accountId}/commands`;
        // }}
        label="Back"
        link={`/accounts/${data.accountId}/commands`}
      />


      <div class={`${CommandStyle}`}>
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
