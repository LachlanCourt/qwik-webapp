import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { CommandData } from "~/models";
import { CommandsContainer, CommandsTitle, CommandsHeader } from "./style.css";

export const Commands = component$(({ data }: { data: Array<CommandData> }) => {
  return (
    <div>
      <div class={`${CommandsContainer}`}>
        <div class={`${CommandsHeader}`}><div class={`${CommandsTitle}`}>{data.length > 0 ? "All Commands" : "No Commands"}</div></div>
        {data.length > 0 && (
          <ul>
            {data.map((command) => {
              return (
                <li>
                  <a
                    href={`/accounts/${command.accountId}/commands/${command.commandId}`}
                  >
                    {command.commandId}: {command.name}
                  </a>
                </li>
              );
            })}{" "}
          </ul>
        )}
      </div></div>
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
