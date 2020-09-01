# Azure Service Bus (ASB) Client Single Page Application (SPA)

[![Deploy](https://github.com/st3v3nhunt/asb-client-spa/workflows/Deploy/badge.svg)](https://github.com/st3v3nhunt/asb-client-spa/actions?query=workflow%3ADeploy)

> A basic single page application client for
  [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview)
  built using [Vue.js](https://vuejs.org/).

## Project setup

Pull the code down and install packages
```
git clone https://github.com/st3v3nhunt/asb-client-spa.git
cd asb-client-spa
npm install
```

Run the development server with hot-reloads
```
npm run serve
```

Start developing...

## Development

Development should be done on a feature branch so it can be pushed to the
remote where a PR can be created against the default branch. The default branch
is protected and only approved PRs can be merged into it.

PRs have a specific build process as detailed in
[main.yml](./github/workflows/main.yml).

### Logging

A [plugin](./src/plugins/logger.js) is used to add an instance of
[loglevel](https://www.npmjs.com/package/loglevel), to the Vue instance. This
enables a centrally controlled logger to provide logging via the `$log`
instance method e.g. within a Vue component
`this.$log.<trace|debug|info|warn|error>` should be used to messages.

## Deployment

When a change is pushed to the default branch (when a PR is merged) the
[deploy action](.github/workflows/deploy.yml) will run.

`npm run build` runs, packaging the site into `./dist` so it can be deployed to
a static site hosting provider.
Currently [GitHub Pages](https://pages.github.com/) is used. The packaged site
it pushed to the
[`gh-pages`](https://github.com/st3v3nhunt/asb-client-spa/tree/gh-pages) branch
of this repo and is served at
[st3v3nhunt.github.io/asb-client-spa/](https://st3v3nhunt.github.io/asb-client-spa/).

### Testing prior to deployment

There aren't any integration environments to test the changes in prior to
deployment, mainly because there is very little difference between the
development environment and the deployed environment. However, it is possible
to run a test environment based on the packaged site that is created during the
build step in the deployment job.

This is done by first installing [serve](https://www.npmjs.com/package/serve)
(`npm install -g serve`), running the build and serving the site
```
npm run build
serve -s dist
```

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Notes on MessageReceiver

`ReceiveMode.receiveAndDelete` is used rather than `ReceiveMode.peekLock` for
the reason that using `registerMessageHandler` will continually receive
messages on the queue. So although `MessageHandlerOptions` can be set to
`{ autoComplete: false }` which leaves the message on the queue the message
handler continues to receive the messages which will result in them ending up
on the Deadletter queue. Rather than message around with this and provide the
option to leave the message on the queue or remove it I've decided to just take
all messages from the queue. If messages do not want to be taken from the queue
the receiver can be disconnected.
