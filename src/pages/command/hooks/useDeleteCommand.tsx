import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { CommandData } from "~/models";

export const useDeleteCommand = (renderedData: Signal<Array<CommandData>>) => {
  const location = useLocation();

  const deleteCommand = $(async (commandId: number) => {
    const result = await fetch(
      `${location.url.origin}/api/v1/accounts/${location.params.accountId}/commands/${commandId}`,
      {
        method: "DELETE",
      }
    ).then((data) => (data.status == 200 ? data.json() : []));
    renderedData.value = result;
  });

  return deleteCommand;
};
