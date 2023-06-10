import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Heading } from "~/components/heading/Heading";
import { Layout } from "~/components/layout/Layout";
import { AccountPageData } from "~/models";
import { theme } from "~/common/styles/theme.css";

export const AccountPage = component$(({ data }: { data: AccountPageData }) => {
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
        <Heading>{data.name} </Heading>
        <div />
      </div>
      <div style={{ paddingBottom: "2rem", display: "flex", gap: "0.6rem" }}>
        <Button link={"commands"}>Commands</Button>
        {data.isAdmin && (
          <>
            <Button link={"edit"}>Edit</Button>
            <Button link={"adduser"}>Add User</Button>
          </>
        )}
      </div>

      {data.moderators.length > 0 ? (
        <>
          <span style={{ color: "darkslategray" }}>Moderators:</span>
          <ul
            style={{
              listStyle: "none",
              width: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid darkslategray",
              borderRadius: "0.3rem",
              background: "aliceblue",
              paddingInlineStart: "unset",
              boxShadow: theme.boxShadow.md,
            }}
          >
            {data.moderators.map((moderator) => (
              <li style={{ padding: "0.6rem" }}>{moderator.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <span>No Moderators yet. Click Add User to add a moderator!</span>
      )}
    </Layout>
  );
});
