<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="control">
          <button
            class="button is-success is-fullwidth"
            :disabled="!sbClient || isReceiving"
            @click="receiveMessages"
            >Receive Messages</button>
        </div>
        <p
          class="content"
          :class="!isReceiving && 'is-invisible'"
          >Receiving messages from <span class="tag is-success">{{ sbClient ? sbClient.fullyQualifiedNamespace : '' }}</span>
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
          :key="message.header.id"
          class="message is-small"
          :class="index === 0 ? 'is-info' : 'is-dark'"
          >
          <div class="message-header">
            <p>MessageId: {{ message.header.id }}. Enqueued at: {{ message.header.enqueuedTimeUtc }}</p>
          </div>

          <div class="message-body">{{ message.msg }}</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
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
    qName: String,
    sbClient: Object
  },

  methods: {
    clearMessages () {
      this.messages = []
    },
    receiveMessages () {
      this.receiver = this.sbClient.createReceiver(this.qName, { receiveMode: 'receiveAndDelete' })
      this.receiver.subscribe({
        processError: async (err) => this.$log.error('Error receiving message:', err),
        processMessage: async (data) => {
          this.$log.info('Received message:', data)
          const msg = { body: data.body, correlationId: data.correlationId, applicationProperties: data.applicationProperties }
          const header = { enqueuedTimeUtc: data.enqueuedTimeUtc, id: data.messageId }
          this.messages.unshift({ header, msg })
        }
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
    sbClient () {
      if (!this.sbClient) {
        this.isReceiving = false
      }
    }
  }
}
</script>
