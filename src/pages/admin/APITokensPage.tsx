import { component$, $, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Layout } from "~/components/layout/Layout";
import { APIUserReadonlyData } from "~/models/APIUserReadonlyData";
import { useDeleteAPIToken } from "./hooks/useDeleteAPIToken";

export const APITokens = component$(
  ({ data }: { data: Array<APIUserReadonlyData> }) => {
    const renderedData = useSignal(data);
    const deleteToken = useDeleteAPIToken(renderedData);

    return (
      <Layout center={false}>
        <Button link="/admin">Back</Button>
        <Button link="new">Generate New Token</Button>

        {renderedData.value.map((apiUser, index) => {
          return (
            <div key={index}>
              <div>
                {apiUser.id} {apiUser.discriminator} {apiUser.webhookUrl}
              </div>
              <button
                onClick$={() => {
                  deleteToken(apiUser.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </Layout>
    );
  }
);
