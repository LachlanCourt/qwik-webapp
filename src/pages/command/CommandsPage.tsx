import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { CommandData } from "~/models";

export const Commands = component$(({ data }: { data: Array<CommandData> }) => {
  return (
    <div>
      {data.length > 0 ? (
        <>
          All Commands
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
        </>
      ) : (
        "No Accounts"
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
