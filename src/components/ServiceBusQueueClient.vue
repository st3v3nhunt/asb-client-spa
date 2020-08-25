<template>
  <div>
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
    createQueueClient () {
      this.qClient = this.sbClient.createQueueClient(this.qName)
      console.log('Created QueueClient')
    },
    async disconnect () {
      if (this.qClient) {
        await this.qClient.close()
        this.qClient = null
        console.log('Disconneted QueueClient')
      } else {
        console.log('QueueClient did not exist')
      }
    }
  },

  computed: {
    disableConnectButton () {
      if (this.sbClient && this.qClient) {
        console.log('sb exists, qc exists, disable it')
        return true
      }
      if (this.sbClient && !this.qClient) {
        console.log('sb exists, qc doesnt exist, enable it')
        return false
      }
      if (!this.sbClient) {
        console.log('sb doesnt exist, disable it')
        return true
      }
      console.log('default, disable')
      return true
    }
  },

  watch: {
    async sbClient () {
      if (this.sbClient && this.qName) {
        this.createQueueClient()
      } else {
        await this.disconnect()
      }
    }
  },

  created () {
    console.log('ServiceBusQueueClient component created')
    this.qName = localStorage.getItem('qName')
  }
}
</script>
