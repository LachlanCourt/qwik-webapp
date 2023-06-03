import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Heading } from "~/components/heading/Heading";
import { Layout } from "~/components/layout/Layout";

export const AdminPage = component$(() => {
  return <Layout center={false}><Heading>Admin</Heading><Button link="apitokens">API Tokens</Button></Layout>;
});
