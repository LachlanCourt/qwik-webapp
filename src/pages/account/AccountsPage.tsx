import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { AccountData } from "~/routes/accounts/[accountId]";



export const Accounts = component$(({data}: {data : Array<AccountData>}) => {
    return (
        <>
            {data.length > 0 
            ? data.map((account) => {
                return (
                    <a href={`/accounts/${account.accountId}`}>{account.accountId}: {account.name}</a>
                )
            }) 
            : 'No Accounts'}
        </>
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