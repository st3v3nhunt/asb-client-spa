<template>
  <div id="service-bus-client">
    <div>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>

      <div class="field is-grouped">
        <div class="control is-expanded">
          <input class="input" type="text" v-model.trim="connectionString" placeholder="Connection String">
        </div>
        <div class="control">
          <button class="button is-primary" @click.prevent="checkForm">Connect to Service Bus</button>
        </div>
      </div>

    </div>
    <message-viewer :sbClient="sbClient"/>
  </div>
</template>

<script>
import { ServiceBusClient } from '@azure/service-bus'
import MessageViewer from '@/components/MessageViewer.vue'

export default {
  name: 'ServiceBusClientConnection',
  components: {
    MessageViewer
  },
  data () {
    return {
      errors: [],
      connectionString: null,
      sbClient: null
    }
  },
  created () {
    console.log('created in ServiceBusClient')
    if (localStorage.getItem('connectionString')) {
      this.connectionString = localStorage.getItem('connectionString')
      this.connectToServiceBus()
    }
  },
  methods: {
    checkForm () {
      this.errors = []
      if (!this.connectionString) {
        this.errors.push('Connection String is required.')
      }

      if (!this.errors.length) {
        localStorage.setItem('connectionString', this.connectionString)
        this.connectToServiceBus()
      }
    },
    connectToServiceBus () {
      this.sbClient = ServiceBusClient.createFromConnectionString(this.connectionString)
      /* this.$emit('create:serviceBusClient', sbClient) */
    }
  }
}
</script>
