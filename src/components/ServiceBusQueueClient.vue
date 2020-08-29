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
                    v-model.trim="qName"
                    placeholder="Enter a Queue Name"
                    :disabled="qClient"
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
                    :disabled="disableConnectButton"
                    @click.prevent="checkForm"
                    >Connect</button>
                </div>
                <div class="control">
                  <button
                    class="button is-warning"
                    :disabled="!qClient"
                    @click.prevent="disconnect"
                    >Disconnect</button>
                </div>
                <p
                  class="content is-medium"
                  :class="!qClient && 'is-invisible'"
                  >Connected to <span class="tag is-success">{{ qClient ? qClient.entityPath : '' }}</span></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <queue-client-message-receiver :qClient="qClient"/>
      </div>
      <div class="column">
        <queue-client-message-sender :qClient="qClient"/>
      </div>
    </div>
  </div>
</template>

<script>
import QueueClientMessageReceiver from '@/components/QueueClientMessageReceiver.vue'
import QueueClientMessageSender from '@/components/QueueClientMessageSender.vue'

export default {
  name: 'ServiceBusQueueClient',

  components: {
    QueueClientMessageReceiver,
    QueueClientMessageSender
  },

  data () {
    return {
      errors: [],
      qClient: null,
      qName: null
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
        this.createQueueClient()
      }
    },
    async createQueueClient () {
      try {
        const qClient = this.sbClient.createQueueClient(this.qName)
        await qClient.peek()
        this.qClient = qClient
        this.$log.info('Peeked message successfully. Both Service Bus Client and Queue Client are valid.')
      } catch (err) {
        const errorName = err.name
        // TODO: Emit service bus errors and deal with them in the ServiceBusClient
        switch (errorName) {
          case 'ServiceCommunicationError':
            this.errors.push(`Service Bus "${this.sbClient.name}" is invalid. Please check the connection string. Additional information - ${err}`)
            break
          case 'MessagingEntityNotFoundError':
            this.errors.push(`Queue "${this.qName}" is invalid. Does it exist on the service bus? Additional information - ${err}`)
            break
          case 'UnauthorizedError':
            this.errors.push(`Connection String is invalid. Additional information - ${err}`)
            break
          default:
            this.errors.push(err)
        }
      }
    },
    async disconnect () {
      if (this.qClient) {
        await this.qClient.close()
        this.qClient = null
        this.$log.info('Disconneted QueueClient')
      } else {
        this.$log.info('QueueClient did not exist')
      }
    }
  },

  computed: {
    disableConnectButton () {
      if (this.sbClient && this.qClient) {
        this.$log.info('sb exists, qc exists, disable it')
        return true
      }
      if (this.sbClient && !this.qClient) {
        this.$log.info('sb exists, qc doesnt exist, enable it')
        return false
      }
      if (!this.sbClient) {
        this.$log.info('sb doesnt exist, disable it')
        return true
      }
      this.$log.info('default, disable')
      return true
    }
  },

  watch: {
    async sbClient () {
      if (this.sbClient && this.qName) {
        this.createQueueClient()
      } else {
        this.errors = []
        await this.disconnect()
      }
    }
  },

  created () {
    this.$log.info('ServiceBusQueueClient component created')
    this.qName = localStorage.getItem('qName')
  }
}
</script>
