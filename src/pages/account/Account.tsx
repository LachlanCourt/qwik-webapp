import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { AccountData } from "~/routes/accounts/[accountId]";



export const Account = ({data}: {data : AccountData}) => {
    return (
        <div>{data.accountId}{data.name}</div>
    )

}


export const AccountResource = component$(() => {
    const resource = useEndpoint<AccountData>()
    return (
        <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(data) => (
          <Account data={data} />
        )}
      />)
})