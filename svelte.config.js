// Pick the right adapter
import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-netlify';

import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    sveltePreprocess({
      defaults: {
        style: 'scss',
        script: 'javascript',
        markup: 'html',
      },
      scss: {
        prependData: `@import 'src/styles/_config.scss';`,
        renderSync: true,
        outputStyle: 'compressed',
      }
    }),
  ],
};

export default config;
