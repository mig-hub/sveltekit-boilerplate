<svelte:window bind:innerWidth bind:innerHeight />

<script>
  // This can be used instead of svelte:window and you can bind
  // props about orientation and breakpoints.
  // e.g. bind:orientation, bind:isMobile, bind:isTablet

  import { browser } from "$app/env";

  // Inherited from svelte:window
  export let innerWidth = 0;
  export let innerHeight = 0;

  // Orientation

  export let orientation = 1; // 1: landscape, 0: square, -1: portrait

  $: {
    if ( innerWidth > innerHeight ) {
      orientation = 1;
    } else if ( innerHeight > innerWidth ) {
      orientation = -1;
    } else {
      orientation = 0;
    }
  }

  // Tablet

  export let tabletBreakpointCmp = 1; // 1: above, 0: equal, -1: below
  export let isTablet = false; // below breakpoint && portrait

  let tabletCssBreakpoint = 0;
  $: {
    tabletCssBreakpoint = getCssBreakpoint( '--tablet-breakpoint' );
    if ( innerWidth > tabletCssBreakpoint ) {
      tabletBreakpointCmp = 1;
    } else if ( innerWidth < tabletCssBreakpoint ) {
      tabletBreakpointCmp = -1;
    } else {
      tabletBreakpointCmp = 0;
    }
  }

  $: {
    if ( orientation == -1 && mobileBreakpointCmp > 0 && tabletBreakpointCmp <= 0 ) {
      isTablet = true;
    } else {
      isTablet = false;
    }
  }

  // Mobile

  export let mobileBreakpointCmp = 1; // 1: above, 0: equal, -1: below
  export let isMobile = false; // below breakpoint && portrait

  let mobileCssBreakpoint = 0;
  $: {
    mobileCssBreakpoint = getCssBreakpoint( '--mobile-breakpoint' );
    if ( innerWidth > mobileCssBreakpoint ) {
      mobileBreakpointCmp = 1;
    } else if ( innerWidth < mobileCssBreakpoint ) {
      mobileBreakpointCmp = -1;
    } else {
      mobileBreakpointCmp = 0;
    }
  }

  $: {
    if ( orientation == -1 && mobileBreakpointCmp <= 0 ) {
      isMobile = true;
    } else {
      isMobile = false;
    }
  }

  // Helpers

  function getCssBreakpoint( cssVar ) {
    if ( ! browser ) {
      return 0;
    }
    let breakpointPx = window.getComputedStyle( document.documentElement )
      .getPropertyValue(cssVar);
    return parseInt( breakpointPx );
  }

</script>

