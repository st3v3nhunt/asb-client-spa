<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control">
          <button
            class="button is-success is-fullwidth"
            :disabled="!qClient || isReceiving"
            @click="receiveMessages"
            >Receive Messages</button>
        </div>
        <p
          class="content"
          :class="!isReceiving && 'is-invisible'"
          >Receiving messages from <span class="tag is-success">{{ qClient ? qClient.entityPath : '' }}</span>
        </p>
        <p
          class="content"
          :class="messages.length === 0 && 'is-invisible'"
          >Messages received: {{ messages.length }}</p>
      </div>
      <div class="column">
        <div class="field">
          <div class="control">
            <button
              class="button is-warning is-fullwidth"
              :disabled="!isReceiving"
              @click="stopReceivingMessages"
              >Stop receiving Messages</button>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button
              class="button is-warning is-fullwidth"
              :disabled="messages.length === 0"
              @click="clearMessages"
              >Clear Received Messages</button>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <article
          v-for="(message, index) in messages"
          :key="message.messageId"
          class="message is-small"
          :class="index === 0 ? 'is-info' : 'is-dark'"
          >
          <div class="message-header">
            <p>MessageId: {{ message.messageId }}. Enqueued at: {{ message.enqueuedTimeUtc }}</p>
          </div>

          <div class="message-body">{{ message }}</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { ReceiveMode } from '@azure/service-bus'

export default {
  name: 'QueueClientMessageReceiver',

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
      this.receiver.registerMessageHandler(async (data) => {
        this.$log.info('Received message:', data)
        const msg = { body: data.body, correlationId: data.correlationId, enqueuedTimeUtc: data.enqueuedTimeUtc, messageId: data.messageId, userProperties: data.userProperties }
        this.$log.info('Simplified message:', msg)
        this.messages.unshift(msg)
      },
      async (err) => {
        this.$log.error('Error receiving message:', err)
      })
      this.$log.info('Receiving messages')
      this.isReceiving = true
    },
    async stopReceivingMessages () {
      await this.receiver.close()
      this.isReceiving = false
      this.$log.info('Receiver closed')
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
