import { routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { getAccount } from "~/common/accessors/getAccount";
import { Resource, component$ } from "@builder.io/qwik";
import { EditAccountData } from "~/models/Account";
import EditAccountPage from "~/pages/account/EditAccountPage";

export const useEndpoint = routeLoader$(async (requestEvent) => {
    const { params, redirect, error } = requestEvent;
    const payload = await verifyToken(requestEvent);
    if (!payload) throw redirect(302, "/login");

    const account = await getAccount(Number(params.accountId), payload.userId, payload.isGlobalAdmin);
    if (!account) throw error(404, "Account Not Found");

    return account as EditAccountData;
});

export default component$(() => {
    const resource = useEndpoint();
    return (
        <Resource
            value={resource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Error</div>}
            onResolved={(data) => <EditAccountPage data={data} />}
        />
    );
});
