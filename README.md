# Azure Service Bus (ASB) Client Single Page Application (SPA)

[![Netlify Status](https://api.netlify.com/api/v1/badges/faddd526-b59a-49cb-b5c5-6c8eac0bfe17/deploy-status)](https://app.netlify.com/sites/asbc/deploys)

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

### In application logging

A [plugin](./src/plugins/logger.js) is used to add an instance of
[loglevel](https://www.npmjs.com/package/loglevel), to the Vue instance. This
enables a centrally controlled logger to provide logging via the `$log`
instance method e.g. within a Vue component
`this.$log.<trace|debug|info|warn|error>` should be used to messages.

## Deployment and hosting

Deployments and hosting are handled by [Netlify](https://www.netlify.com/). The
current setup has changes to the main branch (`master`) deployed to
[asbc.netlfiy.app](https://asbc.netlify.app/). This will happen when merges to
the main branch are made from PR branches. Any branch with a PR that is set to
merge into the main branch will be deployed to a preview environment. It is
possible, although not currently setup, for _all_ branches regardless of
whether they have a PR merging into the main branch or not to have a preview
environment created.

Previously [GitHub Pages](https://pages.github.com/) were deployed to via
[GitHub Actions](https://github.com/features/actions). This also occurred on a
merge to the main branch, however, for reasons covered in adr
[0002](./doc/adr/0002-use-netlify-for-deployments-and-hosting.md) this is no
longer the case. Although it actually still happens for reasons...

The Netlify build runs `npm run build` which packages the site into `./dist`
and then this directory is used as the publishing directory by Netlify. A
Netlify configuration file will be introduced to the repo at some point to make
the config explicit.

### Testing prior to deployment

With preview environments being available for all PRs merging into the main
branch there is little need to run a similar environment on a development or
indeed any other machine. However, it is straight forward to do so, should
there be the desire.

An initial step is to have a static file server available e.g.
[serve](https://www.npmjs.com/package/serve). Once serve is installed
(`npm install -g serve`) the site needs to be built and then serve can serve
the site. This amounts to running these commands (assuming `dist` is the output
directory from the build, which it is by default).
```
npm run build
serve -s dist
```

## Customize site configuration

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
