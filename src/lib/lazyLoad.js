// This is an action you can put on an element with `use:lazyLoad={src}`.
// It works with images and adds the `visible` class when reached AND loaded.
// When styling elements with the `visible` class, don't forget to do it as global.
// Alternatively you can add the global class lazy which has a default fading effect.
// See global style.

// See how the options work here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
}

export const lazyLoad = ( image, src ) => {

  const loaded = () => {
    image.classList.add( 'visible' )
  }

  const observer = new IntersectionObserver( entries => {
    if ( entries[0].isIntersecting ) {
      image.src = src
      if ( image.complete ) {
        loaded()
      } else {
        image.addEventListener( 'load', loaded )
      }
      observer.unobserve( image )
    }
  }, options)

  observer.observe( image )

  return {
    destroy() {
      observer.unobserve( image )
      image.removeEventListener( 'load', loaded )
    }
  }

}

