<template>
  <div class="columns">
    <div class="column">
      <form>
        <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li
            v-for="error in errors"
            :key="error"
          >{{ error }}</li>
        </ul>
        </p>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  v-model.trim="connectionString"
                  placeholder="Enter a Connection String"
                  :disabled="sbClient"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field is-grouped">
              <div class="control">
                <button
                  class="button is-success"
                  :disabled="sbClient"
                  @click.prevent="checkForm"
                >Connect</button>
              </div>
              <div class="control">
                <button
                  class="button is-warning"
                  :disabled="!sbClient"
                  @click.prevent="disconnect"
                >Disconnect</button>
              </div>
              <p
                class="content is-medium"
                :class="!sbClient && 'is-invisible'"
              >Connected to <span class="tag is-success"> {{ sbClient ? sbClient.name : '' }} </span>
              </p>
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
  name: 'TheServiceBusClient',
  components: {
  },
  data () {
    return {
      errors: [],
      connectionString: null,
      sbClient: null
    }
  },
  created () {
    console.log('TheServiceBusClient component created')
    this.connectionString = localStorage.getItem('connectionString')
    if (this.connectionString) {
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
      this.$emit('create:serviceBusClient', this.sbClient)
      console.log('Connected to ServiceBusClient')
    },
    async disconnect () {
      await this.sbClient.close()
      this.sbClient = null
      this.$emit('destroy:serviceBusClient')
      console.log('Disconneted ServiceBusClient')
    }
  }
}
</script>
