import { component$ } from "@builder.io/qwik";
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

export const Commands = component$(({ data }: { data: Array<CommandData> }) => {
  const nav = useNavigate();
  return (
    <div class={`${CommandsContainer}`}>
      <div class={`${CommandsHeader}`}>
        <div class={`${CommandsTitle}`}>
          {data.length > 0 ? "All Commands" : "No Commands"}
        </div>
      </div>
      {data.length > 0 && (
        <ul class={`${CommandsList}`}>
          {data.map((command) => {
            return (
              <li class={`${CommandsListItem}`}>
                <a
                  href={`/accounts/${command.accountId}/commands/${command.commandId}`}
                >
                  <div class={`${CommandsTile}`}>
                    {command.commandId}: {command.name}
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
