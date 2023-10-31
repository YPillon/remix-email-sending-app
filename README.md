# Welcome to this app!

This app is built with :
- Remix (https://remix.run/docs/en/main) 
- The The node-mailjet npm package (https://www.npmjs.com/package/node-mailjet) which connects to the Mailjet API.
- TailwindCSS (https://tailwindcss.com/docs/installation)

It basically prompts the user for their email address and send them an email with a link to a dummy PDF.

This project is a self-training to learn how to send emails programatically based on user input.

Enjoy 🙌

## Setup

Install npm dependencies:

```sh
npm install
```

Populate the .env file with your Mailjet public and private keys.

Then launch the dev server:

```sh
npm run dev
```


This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
