<script context="module">

  /** @type {import('@sveltejs/kit').Load} */

  import { get } from 'svelte/store';
  import * as stores from '$lib/stores';

  export const load = async ({ url, fetch }) => {

    const defaultReturn = { props: { url } };

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
</script>

<script>
  import PageTransition from "$lib/components/PageTransition.svelte";
  export let url;
</script>

<div id='layout'>
  <!-- Pass the `url` prop to the `PageTransition` component, causing it to re-render when the page changes -->
  <PageTransition {url}>
    <slot />
  </PageTransition>
</div>

<style global>
  // Fonts

  // Basic font loading example:
  // @font-face{
  //   font-family: "Font Name";
  //   src: url("~assets/fonts/filename.woff2") format("woff2"), url("~assets/fonts/filename.woff") format("woff");
  // }

  // General

  :root {
    --tablet-breakpoint: #{$tablet-breakpoint};
    --mobile-breakpoint: #{$mobile-breakpoint};
  }

  body {
    width: 100%;
    height: 100%;
    background-color: $bg-color;
    color: $fg-color;
    font-family: $body-font-family;
    /* overflow: hidden; // Scroll is on .page elements */
    line-height: 1.2;
    font-size: vw($body-size);
    @include tablet {
      font-size: vw($body-size-tablet);
    }
    @include mobile {
      font-size: vw($body-size-mobile);
    }
  }

  img.lazy {
    opacity: 0;
    transition: opacity 0.5s ease-out;
    &.visible {
      opacity: 1;
    }
  }

</style>

