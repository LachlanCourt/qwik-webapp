import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";

export const AdminPage = component$(() => {
  return <Button link="apitokens" label="API Tokens" />;
});
