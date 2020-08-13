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

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Connection String</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded">
              <input class="input" type="text" v-model.trim="connectionString" placeholder="Enter a Connection String">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-success">Connect</button>
            </div>
            <div class="control">
              <button class="button is-warning" disabled>Disconnect</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import { ServiceBusClient } from '@azure/service-bus'

export default {
  name: 'ServiceBusClientConnection',
  components: {
  },
  data () {
    return {
      errors: [],
      connectionString: null
    }
  },
  created () {
    console.log('ServiceBusClient component created')
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
      const sbClient = ServiceBusClient.createFromConnectionString(this.connectionString)
      this.$emit('create:serviceBusClient', sbClient)
      console.log('Connected to ServiceBusClient')
    }
  }
}
</script>
