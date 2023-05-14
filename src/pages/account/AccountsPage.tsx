import { component$, Resource } from "@builder.io/qwik";
import { AccountData } from "~/models";

export const Accounts = component$(({ data }: { data: Array<AccountData> }) => {
  return (
    <div>
      All Accounts
      {data.length > 0 ? (
        <ul>
          {data.map((account) => {
            return (
              <li>
                <a href={`/accounts/${account.accountId}`}>
                  {account.accountId}: {account.name}
                </a>
              </li>
            );
          })}{" "}
        </ul>
      ) : (
        "No Accounts"
      )}
    </div>
  );
});
