import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import Header from "../components/header/header";

interface Response { someData: string }

export const onRequest: RequestHandler<Response> = ({ response, request, cookie }) => {
  console.log('Hit')
  return { someData: 'hello' }
}

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
