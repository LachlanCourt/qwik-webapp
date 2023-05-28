import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { CommandData } from "~/models";
import {
  CommandsContainer,
  CommandsTitle,
  CommandsHeader,
  CommandsList,
  CommandsListItem,
  CommandsTile,
} from "./style.css";
import { useDeleteCommand } from "./hooks/useDeleteCommand";
import { Button } from "~/components/button";

export const Commands = component$(({ data }: { data: Array<CommandData> }) => {
  const nav = useNavigate();
  const renderedData = useSignal(data);
  const deleteCommand = useDeleteCommand(renderedData);
  return (
    <div class={`${CommandsContainer}`}>
      <div class={`${CommandsHeader}`}>
        <div class={`${CommandsTitle}`}>
          {data.length > 0 ? "All Commands" : "No Commands"}
        </div>
        <Button label="New" link="new" />
      </div>
      {renderedData.value.length > 0 && (
        <ul class={`${CommandsList}`}>
          {renderedData.value.map((command) => {
            return (
              <li class={`${CommandsListItem}`}>
                <a
                  href={`/accounts/${command.accountId}/commands/${command.commandId}`}
                >
                  <div class={`${CommandsTile}`}>
                    {command.commandId}: {command.name}
                    <button
                      preventdefault:click
                      onClick$={() => deleteCommand(command.commandId)}
                    >
                      Delete
                    </button>
                  </div>
                </a>

                {/* <Link href={`/accounts/${command.accountId}/commands/${command.commandId}`}>
                  <div
                  // onClick$={() => {
                  //   nav.path = `/accounts/${command.accountId}/commands/${command.commandId}`
                  // }}
                  >{command.commandId}: {command.name}</div>
                </Link> */}
              </li>
            );
          })}{" "}
        </ul>
      )}
    </div>
  );
});
