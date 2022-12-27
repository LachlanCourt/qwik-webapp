import { component$, Resource, useClientEffect$, useResource$ ,useStore, useTask$} from "@builder.io/qwik";
import { useEndpoint, useLocation, useNavigate } from "@builder.io/qwik-city";
import {isBrowser} from '@builder.io/qwik/build'

import User from "~/components/user/User";

export default component$((props) => {

  const data = useStore({message: ''})
  const nav = useNavigate()

  /*const resource = */useClientEffect$
  (async ({ track, cleanup }) => {
    const {signal, abort} = new AbortController();
    cleanup(() => abort('cleanup'));
    const res = await fetch(`/api/v1/users`, {
      signal,
    });
    if (res.status === 200) {
      const resolved = await res.json()
      data.message = resolved.message
    } 
  });


  console.log(data.message)

    return (
      // <Resource
      //   value={resource}
      //   onPending={() => <div>Loading...</div>}
      //   onRejected={() => <div>Failed to person data</div>}
      //   onResolved={(resolved) => {
      //     return (
      //       <div>
      //         {resolved.message}
      //       </div>
      //     );
      //   }}
      // />
      
      <div>{data.message ? data.message : 'error'}</div>
      
      )})