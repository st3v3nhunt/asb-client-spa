<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control">
          <button class="button is-success is-fullwidth" :disabled="!qClient || isReceiving" @click="receiveMessages">Receive Messages</button>
        </div>
        <p :class="['content', 'is-medium', { 'is-invisible': !isReceiving }]">Receiving messages from <span class="tag is-success">{{ qClient ? qClient.entityPath : '' }}</span></p>
      </div>
      <div class="column">
        <div class="control">
          <button class="button is-warning is-fullwidth" :disabled="!isReceiving" @click="stopReceivingMessages">Stop receiving Messages</button>
        </div>
        <div class="control">
          <button class="button is-warning is-fullwidth" :disabled="messages.length === 0" @click="clearMessages">Clear Received Messages</button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <article v-for="(message, index) in messages" :key="message.messageId" :class="['message', 'is-small', (index === 0) ? 'is-info' : 'is-dark' ]">
          <div class="message-header">
            <p>MessageId: {{ message.messageId }}. Queue Source: {{ message._context.entityPath }}. Enqueued at: {{ message.enqueuedTimeUtc }}</p>
          </div>

          <div class="message-body">{{ message.body }}</div>
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
    clearMessages () {
      this.messages = []
    },
    async receiveMessages () {
      this.receiver = this.qClient.createReceiver(ReceiveMode.receiveAndDelete)
      this.receiver.registerMessageHandler(async (msg) => {
        console.log('Received message:', msg)
        this.messages.unshift(msg)
      },
      async (err) => {
        console.error('Error receiving message:', err)
      })
      console.log('Receiving messages')
      this.isReceiving = true
    },
    async stopReceivingMessages () {
      await this.receiver.close()
      this.isReceiving = false
      console.log('Receiver closed')
    }
  },
  watch: {
    qClient () {
      if (!this.qClient) {
        this.isReceiving = false
      }
    }
  }
}
</script>

<style>
</style>
