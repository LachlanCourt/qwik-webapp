import { component$ } from "@builder.io/qwik";

const NewAccount = component$(() => {
    return <><div>Create New Account</div>
    <form action="/api/v1/accounts/new" method="POST">
        <span htmlFor="account-name">Account Name</span>
        <input name="name" id="account-name" />
        <span htmlFor="admin-id">Admin ID</span>
        <input name="adminId" id="admin-id" />
        <button type="submit">Create</button>
    </form>
    
    
    </>
})

export default NewAccount

