import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { AccountData } from "~/models";



export const Accounts = component$(({data}: {data : Array<AccountData>}) => {
    return (
        <div>All Accounts
            {data.length > 0 
            ? <ul>{data.map((account) => {
                return (
                    <li><a href={`/accounts/${account.accountId}`}>{account.accountId}: {account.name}</a></li>
                )
            })} </ul>
            : 'No Accounts'}
        </div>
    )})

export const AccountsResource = component$(() => {
    const resource = useEndpoint<Array<AccountData>>()
    return (
        <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(data) => (
          <Accounts data={data} />
        )}
      />)
})