import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
// import Header from "../components/header/header";

interface Response {
  someData: string;
}

export const onRequest: RequestHandler = (requestEvent) => {
  const { request, cookie, json } = requestEvent;
  // console.log('Hit')
  // json(200, { someData: "hello" } as Response);
};

export default component$(() => {
  // console.log("hi there");
  return (
    <>
      <main>
        {/* <Header /> */}
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
