import { component$ } from "@builder.io/qwik";
import { Layout } from "~/components/layout/Layout";
import { Heading } from "~/components/heading/Heading";
import { AccountPageData } from "~/models";
import { Button } from "~/components/button";
import { theme } from "~/common/styles/theme.css";
import { styles } from "./styles.css";

export const Accounts = component$(
  ({ data }: { data: Array<AccountPageData> }) => {
    return (
      <Layout center={false}>
        <Heading>All Accounts</Heading>
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
        {data.length > 0 ? (
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
            {data.map((account) => {
              return (
                <li
                  style={{
                    borderBottom: "1px solid darkslategray",
                    padding: 0,
                  }}
                >
                  <a
                    class={styles}
                    href={`/accounts/${account.accountId}`}
                    style={{
                      display: "flex",
                      height: "100%",
                      padding: "2rem",
                      color: "darkslategray",
                      borderRadius: theme.borderRadius.md,
                    }}
                    role="button"
                  >
                    {account.accountId}: {account.name}
                  </a>
                </li>
              );
            })}{" "}
          </ul>
        ) : (
          "No Accounts"
        )}
      </Layout>
    );
  }
);
