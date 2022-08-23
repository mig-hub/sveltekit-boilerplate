/** @type {import('./$types').LayoutLoad} */

import { get } from 'svelte/store';
import * as stores from '$lib/stores';

export async function load({ url, fetch }) {

  const defaultReturn = { url };

  // Pre baked holding page redirect.
  // Just uncomment it.
  //
  // if ( ( url.hostname === 'www.example.org' ) && url.pathname !== '/holding' ) {
  //   return {
  //     status: 302,
  //     redirect: '/holding',
  //   };
  // }

  // Pre baked contentful endpoint call for initilizing the stores.
  // Just uncomment it.
  // This is coded with a loop so that you don't have anything to do
  // as long as the key in the endpoint is the same as the key in the store.
  //
  // if ( ! get(stores.contentLoaded).value ) {
  //   const [ content ] = await Promise.all([
  //     fetch( '/data.json' ).then( r => r.json() ),
  //   ]);
  //   for ( let k in content ) {
  //     if ( content.hasOwnProperty( k ) && stores[k] ) {
  //       stores[k].set( content[k] );
  //     }
  //   }
  //   stores.contentLoaded.set( true );
  // }

  return defaultReturn;
};

