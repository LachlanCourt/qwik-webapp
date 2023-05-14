import { component$, Resource } from "@builder.io/qwik";
import { AccountData } from "~/models";

export const AccountPage = component$(({ data }: { data: AccountData }) => {
  return (
    <div>
      {data.accountId}: {data.name}
    </div>
  );
});
