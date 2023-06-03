import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Heading } from "~/components/heading/Heading";
import { Layout } from "~/components/layout/Layout";
export default component$(() => {
  return (
    <Layout>
      <Heading>Coming soon!</Heading>
      <Button link="/">Click here to return to your account</Button>
    </Layout>
  );
});
