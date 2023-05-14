import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";
import { CommandData } from "~/models";
import { CommandContainer, CommandStyle } from "./style.css";

export const CommandPage = component$(({ data }: { data: CommandData }) => {
  const nav = useNavigate();

  return (
    <div class={`${CommandContainer}`}>
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
    </div>
  );
});
