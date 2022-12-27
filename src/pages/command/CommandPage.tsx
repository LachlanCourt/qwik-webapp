import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { CommandData } from "~/models";



export const CommandPage = component$(({data}: {data : CommandData}) => {
    return (
        <div>{data.commandId}: {data.name}, account: {data.accountId}</div>
    )

})


export const CommandResource = component$(() => {
    const resource = useEndpoint<CommandData>()
    return (
        <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(data) => (
          <CommandPage data={data} />
        )}
      />)
})