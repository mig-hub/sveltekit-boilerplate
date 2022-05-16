# Start a new project

## Install

```bash
$ git clone https://github.com/mig-hub/sveltekit-boilerplate.git
```

Rename directory and move there.
Update the `package.json` to change the package name.

Then install packages:

```bash
$ npm install
```

Install contentful if you want to use it.

```bash
$ npm install --save contentful
```

If you do, ensure you uncomment necessary lines in the config and add the ENV variables.

There are plugins and middlewares ready to be used by uncommenting the right lines in the config.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
