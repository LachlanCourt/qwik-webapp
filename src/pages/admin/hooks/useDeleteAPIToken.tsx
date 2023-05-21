import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { APIUserReadonlyData } from "~/models/APIUserReadonlyData";

export const useDeleteAPIToken = (
  renderedData: Signal<APIUserReadonlyData[]>
) => {
  const location = useLocation();

  const deleteToken = $(async (tokenId: number) => {
    const result = await fetch(
      `${location.url.origin}/api/v1/admin/apitokens/${tokenId}`,
      {
        method: "DELETE",
      }
    ).then((data) => (data.status == 200 ? data.json() : []));
    renderedData.value = result;
  });

  return deleteToken;
};
