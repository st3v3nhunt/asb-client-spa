<template>
  <div id="message-viewer">
  <form @submit.prevent="checkForm">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>

    <div class="field">
      <label class="label">Queue Name</label>
      <input class="input" type="text" v-model.trim="queueName" placeholder="Queue Name">
    </div>

    <div class="control">
      <button class="button is-info" :disabled="!sbClient">Connect to Queue</button>
    </div>
  </form>
  <div class="control">
    <div class="buttons">
      <button class="button is-info" :disabled="!qClient" @click="subscribeToMessages()">Subscribe to Messages</button>
    </div>
  </div>
  </div>
</template>

<script>
import { ReceiveMode } from '@azure/service-bus'

export default {
  name: 'MessageViewer',
  data () {
    return {
      errors: [],
      messages: [],
      qClient: null,
      queueName: null
    }
  },
  props: {
    sbClient: Object
  },
  methods: {
    checkForm () {
      this.errors = []
      if (!this.queueName) {
        this.errors.push('Queue Name is required.')
      }

      if (!this.errors.length) {
        localStorage.setItem('queueName', this.queueName)
        this.connectToQueue()
      }
    },
    connectToQueue () {
      console.log(`Connecting to queue '${this.queueName}'...`)
      this.qClient = this.sbClient.createQueueClient(this.queueName)
      console.log('qClient', this.qClient)
    },
    async subscribeToMessages () {
      console.log('get them messages')
      const receiver = this.qClient.createReceiver(ReceiveMode.peekLock)
      receiver.registerMessageHandler(async (msg) => {
        console.log('received message', msg)
        this.messages.push(msg)
      },
      async (err) => {
        console.error('error receiving message', err)
      })
      /* this.messages = await receiver.receiveMessages(10) */
    }
  },
  created () {
    console.log('created in MessageViewer')
    if (localStorage.getItem('queueName')) {
      this.queueName = localStorage.getItem('queueName')
      if (this.sbClient) {
        this.connectToQueue()
      }
    }
  }
}
</script>

<style>
</style>
