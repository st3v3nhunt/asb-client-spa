<template>
  <div class="columns">
    <div class="column">
      <form @submit.prevent="checkForm">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>

        <div class="field is-grouped">
          <div class="control is-expanded">
            <input class="input" type="text" v-model.trim="qName" placeholder="Queue Name">
          </div>
          <div class="control">
            <button class="button is-info" :disabled="!sbClient">Connect to Queue</button>
          </div>
        </div>
      </form>
    </div>

    <div class="column">
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-success" :disabled="!qClient || isReceiving" @click="subscribeToMessages()">Subscribe to Messages</button>
        </div>
        <div class="control">
          <button class="button is-warning" :disabled="!isReceiving" @click="unsubscribeToMessages()">Unsubscribe to Messages</button>
        </div>
        <div class="content is-medium" v-if="isReceiving">Receiving messages from <span class="tag is-black is-medium">{{ qClient.entityPath }}</span></div>
      </div>
    </div>

    <div class="column">
      <article v-for="(message, index) in messages" :key="message.messageId" :class="['message', 'is-small', (index === 0) ? 'is-info' : 'is-dark' ]">
        <div class="message-header">
          <p>MessageId: {{ message.messageId }}. Enqueued at: {{ message.enqueuedTimeUtc }}</p>
        </div>

        <div class="message-body">
          {{ message.body }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { ReceiveMode } from '@azure/service-bus'

export default {
  name: 'QueueClient',
  data () {
    return {
      errors: [],
      isReceiving: false,
      messages: [],
      qClient: null,
      qName: null,
      receiver: null
    }
  },
  props: {
    sbClient: Object
  },
  methods: {
    checkForm () {
      this.errors = []
      if (!this.qName) {
        this.errors.push('Queue Name is required.')
      }

      if (!this.errors.length) {
        localStorage.setItem('qName', this.qName)
        this.connectToQueue()
      }
    },
    connectToQueue () {
      console.log(`Connecting to queue '${this.qName}'...`)
      this.qClient = this.sbClient.createQueueClient(this.qName)
      console.log('qClient', this.qClient)
    },
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
      console.log('qClient closed')
    }
  },
  created () {
    console.log('created in QueueClient')
    if (localStorage.getItem('qName')) {
      this.qName = localStorage.getItem('qName')
      if (this.sbClient) {
        this.connectToQueue()
      }
    }
  }
}
</script>

<style>
</style>
