import { component$ } from "@builder.io/qwik";

export const AddUserPage = component$(() => {
    return (
        <>
            <div>Enter the email address of the user and they will be emailed a sign up link</div>
            <form action="/api/v1/users/adduser" method="POST">
                <label for="email-field">Email</label>
                <input name="email" id="email-field" />
                <button type="submit">Send email</button>
            </form>
        </>
    );
});
