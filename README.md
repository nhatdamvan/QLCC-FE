# IC2 Code Template from Crema-MUI-NextJS
## HƯỚNG DẪN 
Tài liệu tiếng Anh https://docs.cremawork.com/v/v-4/overview/crema-overview

### Local dev
yarn install
yarn start

### Local product
yarn build

### Serverless deployment
1. CloudFlare Pages

ENVIRONMENT NODE_VERSION = 14

Build command: yarn && yarn build

Build output directory: /dist/apps/source

Root directory: /

Build comments on pull requests: Enabled


2. AWS Amplify


3. Google  

Tham khảo:

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Development server

Run `nx serve source` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
