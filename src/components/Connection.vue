<template>
  <div id="connection">
  <form @submit.prevent="checkForm">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>

    <div class="field">
      <label class="label">Connection String</label>
      <input class="input" type="text" v-model.trim="connectionString" placeholder="Connection String">
    </div>

    <div class="field">
      <label class="label">Queue Name</label>
      <input class="input" type="text" v-model.trim="queueName" placeholder="Queue Name">
    </div>

    <div class="control">
      <button class="button is-primary">Connect</button>
    </div>
  </form>
  </div>
</template>

<script>
import { ServiceBusClient } from '@azure/service-bus'

export default {
  name: 'Connection',
  data () {
    return {
      errors: [],
      connectionString: null,
      queueName: null
    }
  },
  mounted () {
    if (localStorage.getItem('connectionString')) {
      this.connectionString = localStorage.getItem('connectionString')
    }
    if (localStorage.getItem('queueName')) {
      this.queueName = localStorage.getItem('queueName')
    }

    // assuming both queueName and connectionString are populated means they
    // are valid the connection could be made automatically e.g.
    // this.connect()
  },
  methods: {
    checkForm () {
      this.errors = []
      if (!this.connectionString) {
        this.errors.push('Connection String is required.')
      }
      if (!this.queueName) {
        this.errors.push('Queue Name is required.')
      }

      if (!this.errors.length) {
        localStorage.setItem('connectionString', this.connectionString)
        localStorage.setItem('queueName', this.queueName)
        this.connect()
      }
    },
    connect () {
      console.log(`Connecting to queue '${this.queueName}'...`)
      const sbClient = ServiceBusClient.createFromConnectionString(this.connectionString)
      const queueClient = sbClient.createQueueClient(this.queueName)
      console.log('queueClient', queueClient)
      this.$emit('create:queueClient', queueClient)
    }
  }
}
</script>
