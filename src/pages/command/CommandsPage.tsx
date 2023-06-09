import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { CommandPageData } from "~/models";

import { useDeleteCommand } from "./hooks/useDeleteCommand";
import { Button } from "~/components/button";
import { Layout } from "~/components/layout/Layout";
import { Heading } from "~/components/heading/Heading";
import { theme } from "~/common/styles/theme.css";
import { styles } from "./styles.css";

export const Commands = component$(
  ({ data }: { data: Array<CommandPageData> }) => {
    const nav = useNavigate();
    const renderedData = useSignal(data);
    const deleteCommand = useDeleteCommand(renderedData);

    return (
      <Layout center={false}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <Button link={"../"}>Back</Button>
          </div>
          <Heading>All Commands</Heading>
          <div />
        </div>

        <div
          style={{
            paddingBottom: "2rem",
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            link="new"
            style={{
              padding: "0.5rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
            }}
          >
            +
          </Button>
        </div>
        {renderedData.value.length > 0 ? (
          <ul
            style={{
              listStyle: "none",
              width: "90%",
              border: "1px solid darkslategray",
              borderRadius: "0.3rem",
              background: "aliceblue",
              paddingInlineStart: "unset",
              boxShadow: theme.boxShadow.md,
            }}
          >
            {renderedData.value.map((command) => {
              return (
                <li
                  style={{
                    borderBottom: "1px solid darkslategray",
                    padding: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <a
                    class={styles}
                    href={`/accounts/${command.accountId}/commands/${command.id}`}
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      padding: "2rem",
                      color: "darkslategray",
                      borderRadius: theme.borderRadius.md,
                    }}
                    role="button"
                  >
                    {command.id}: {command.name}
                  </a>
                  <div style={{ paddingRight: "0.6rem" }}>
                    <Button
                      preventdefault:click
                      onClick$={() => deleteCommand(command.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}{" "}
          </ul>
        ) : (
          "No Commands"
        )}
      </Layout>
    );
  }
);
