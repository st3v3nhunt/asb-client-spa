<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control">
          <button class="button is-success is-fullwidth" :disabled="!qClient || isReceiving" @click="subscribeToMessages()">Subscribe to Messages</button>
        </div>
        <div :class="['content', 'is-medium', { 'is-invisible': !isReceiving }]">Subscribed to <span class="tag is-success">{{ qClient ? qClient.entityPath : '' }}</span></div>
      </div>
      <div class="column">
        <div class="control">
          <button class="button is-warning is-fullwidth" :disabled="!isReceiving" @click="unsubscribeToMessages()">Unsubscribe to Messages</button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <article v-for="(message, index) in messages" :key="message.messageId" :class="['message', 'is-small', (index === 0) ? 'is-info' : 'is-dark' ]">
          <div class="message-header">
            <p>MessageId: {{ message.messageId }}. Queue Source: {{ message._context.entityPath }}. Enqueued at: {{ message.enqueuedTimeUtc }}</p>
          </div>

          <div class="message-body">
            {{ message.body }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { ReceiveMode } from '@azure/service-bus'

export default {
  name: 'MessageReceiver',
  data () {
    return {
      isReceiving: false,
      messages: [],
      receiver: null
    }
  },
  props: {
    qClient: Object
  },
  methods: {
    async subscribeToMessages () {
      console.log('subscribing to messages')
      this.receiver = this.qClient.createReceiver(ReceiveMode.peekLock)
      this.receiver.registerMessageHandler(async (msg) => {
        console.log('received message', msg)
        this.messages.unshift(msg)
      },
      async (err) => {
        console.error('error receiving message', err)
      })
      this.isReceiving = true
    },
    async unsubscribeToMessages () {
      await this.receiver.close()
      this.isReceiving = false
      console.log('receiver closed')
    }
  }
}
</script>

<style>
</style>
