import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "~/common/hooks/useLocation";
import { CommandPageData } from "~/models";

export const useDeleteCommand = (
  renderedData?: Signal<Array<CommandPageData>>
) => {
  const location = useLocation();

  const deleteCommand = $(async (commandId: number) => {
    const result = await fetch(
      `${location.url.origin}/api/v1/accounts/${location.params.accountId}/commands/${commandId}`,
      {
        method: "DELETE",
      }
    ).then((data) => (data.status == 200 ? data.json() : []));
    if (renderedData) renderedData.value = result;
  });

  return deleteCommand;
};
