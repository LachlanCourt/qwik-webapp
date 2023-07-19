import {
  Component,
  NoSerialize,
  Signal,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import globalStyles from "./global.css?inline";
import "./common/styles/theme.css.ts";
import { Modal } from "./components/modal/Modal";
import { JSX } from "@builder.io/qwik/jsx-runtime";

export const GlobalContext = createContextId<{
  modal: Signal<HTMLDialogElement>;
  modalContent: NoSerialize<Component<any>>;
}>("GlobalContext");

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const modal = useSignal<HTMLDialogElement>(
    null as unknown as HTMLDialogElement
  );
  const modalContent = noSerialize(component$(() => null));

  const store = useStore({
    modal,
    modalContent,
  });
  useContextProvider(GlobalContext, store);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
        <Modal modalRef={modal} />
      </body>
    </QwikCityProvider>
  );
});
