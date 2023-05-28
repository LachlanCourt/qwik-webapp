import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button";

import { CommandContainer, CommandStyle } from "./style.css";
import { Command } from "@prisma/client";

export const CommandPage = component$(({ data }: { data: Command }) => {
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
        {data.id}: {data.name}, account: {data.accountId}
      </div>
      <Button
        link={`/accounts/${data.accountId}/commands/${data.id}/edit`}
        label="Edit"
      />
    </div>
  );
});
