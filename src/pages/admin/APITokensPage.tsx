import { component$, $, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { APIUserReadonlyData } from "~/models/APIUserReadonlyData";
import { useDeleteAPIToken } from "./hooks/useDeleteAPIToken";

export const APITokens = component$(
  ({ data }: { data: Array<APIUserReadonlyData> }) => {
    const renderedData = useSignal(data);
    const deleteToken = useDeleteAPIToken(renderedData);

    return (
      <>
        <Button link="/admin" label="Back" />
        <Button link="new" label="Generate New Token" />

        {renderedData.value.map((apiUser, index) => {
          return (
            <div key={index}>
              <div>
                {apiUser.id} {apiUser.discriminator}
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
      </>
    );
  }
);
