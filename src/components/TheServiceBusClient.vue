<template>
  <div>
  <div class="columns">
    <div class="column">
      <form>
        <div class="field">
          <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li
              class="help is-danger"
              v-for="(error, index) in errors"
              :key="index"
              >{{ error }}</li>
          </ul>
          </p>
        </div>

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
                  @click.prevent="connectToServiceBus"
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
                >Connected to <span class="tag is-success">{{ sbClient ? sbClient.fullyQualifiedNamespace : '' }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  v-model.trim="qName"
                  placeholder="Enter a Queue Name"
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
                    :disabled="false"
                    @click.prevent="saveQName"
                    >Save queue</button>
                </div>
      <!--
                <div class="control">
                  <button
                    class="button is-warning"
                    :disabled="false"
                    @click.prevent="editQName"
                    >Edit queue</button>
                </div>
                <div class="control">
                  <button
                    class="button is-danger"
                    :disabled="false"
                    @click.prevent="clearQName"
                    >Clear queue</button>
                </div>
      -->
              </div>
            </div>
          </div>
      </form>
    </div>
  </div>
    <div class="columns">
      <div class="column">
        <queue-client-message-receiver :sbClient="sbClient" :qName="qName"/>
      </div>
      <div class="column">
        <queue-client-message-sender :sbClient="sbClient" :qName="qName"/>
      </div>
    </div>
    </div>
</template>

<script>
import { ServiceBusClient } from '@azure/service-bus'
import QueueClientMessageReceiver from '@/components/QueueClientMessageReceiver.vue'
import QueueClientMessageSender from '@/components/QueueClientMessageSender.vue'

export default {
  name: 'TheServiceBusClient',

  components: {
    QueueClientMessageReceiver,
    QueueClientMessageSender
  },

  data () {
    return {
      errors: [],
      connectionString: null,
      qName: null,
      sbClient: null
    }
  },

  created () {
    this.$log.info('TheServiceBusClient component created')
    this.connectionString = localStorage.getItem('connectionString')
    if (this.connectionString) {
      this.connectToServiceBus()
    }
    this.qName = localStorage.getItem('qName')
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
      this.sbClient = new ServiceBusClient(this.connectionString)
      this.$emit('create-service-bus-client', this.sbClient)
      this.$log.info('Connected to ServiceBusClient')
    },
    async disconnect () {
      await this.sbClient.close()
      this.sbClient = null
      this.$emit('destroy-service-bus-client')
      this.$log.info('Disconneted ServiceBusClient')
    },
    clearQName () {
      localStorage.removeItem('qName')
      this.qName = null
    },
    saveQName () {
      this.errors = []
      if (!this.qName) {
        this.errors.push('Queue Name is required.')
      }

      if (!this.errors.length) {
        localStorage.setItem('qName', this.qName)
      }
    }
  }
}
</script>
