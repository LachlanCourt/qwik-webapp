import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { CommandData } from "~/models";
import { CommandsContainer, CommandsTitle, CommandsHeader, CommandsList, CommandsCommand } from "./style.css";

export const Commands = component$(({ data }: { data: Array<CommandData> }) => {
  return (
    <div class={`${CommandsContainer}`}>
      <div class={`${CommandsHeader}`}><div class={`${CommandsTitle}`}>{data.length > 0 ? "All Commands" : "No Commands"}</div></div>
      {data.length > 0 && (
        <ul class={`${CommandsList}`}>
          {data.map((command) => {
            return (
              <li class={`${CommandsCommand}`}>
                <a
                  href={`/accounts/${command.accountId}/commands/${command.commandId}`}
                >
                  <div>{command.commandId}: {command.name}</div>
                </a>
              </li>
            );
          })}{" "}
        </ul>
      )}
    </div>
  );
});

export const CommandsResource = component$(() => {
  const resource = useEndpoint<Array<CommandData>>();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <Commands data={data} />}
    />
  );
});
