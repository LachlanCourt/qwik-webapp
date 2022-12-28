import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";

interface Response { }

export const onPost: RequestHandler<Response> = async ({ request, response, cookie }) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    const formData = await request.formData();
    const email = formData.get("email")?.toString() || "";

    // Create token


    // Build email

    // Send

}