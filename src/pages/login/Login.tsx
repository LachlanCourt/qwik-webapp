import { component$ } from "@builder.io/qwik";

const Login = component$(() => {
    return <><div>You gotta login</div>
    <form action="/api/v1/auth/login" method="POST">
        <span htmlFor="email-field">Email</span>
        <input name="email" id="email-field" />
        <span htmlFor="password-field">Password</span>
        <input name="password" id="password-field" type="password" />
        <button type="submit">Sign in</button>
    </form>
    
    
    </>
})

export default Login

