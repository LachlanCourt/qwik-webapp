import { component$, Slot } from "@builder.io/qwik";
import { CenterContainer, CenterWrapper, TopContainer, TopWrapper } from "~/theme/components.css";

export const Layout = component$(({ center = true }: { center?: boolean }) => {
  return (
    <div class={center ? CenterContainer : TopContainer
    }>
      <div class={center ? CenterWrapper : TopWrapper}>
        <Slot />
      </div>
    </div >
  );
});
