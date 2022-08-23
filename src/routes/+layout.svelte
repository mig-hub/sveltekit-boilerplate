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

<style lang='scss' global>

  @import "src/styles/_resets.scss";

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

