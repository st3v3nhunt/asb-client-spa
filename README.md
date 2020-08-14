# my-first-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
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
