<template>
  <div>
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
            <label class="label">Queue Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <input class="input" type="text" v-model.trim="qName" placeholder="Enter a Queue Name">
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
                <button class="button is-success" :disabled="!sbClient">Connect</button>
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
    <div class="columns">
      <div class="column">
        <message-receiver :qClient="qClient"/>
      </div>
      <div class="column">
        <message-sender :qClient="qClient"/>
      </div>
    </div>
  </div>
</template>

<script>
import MessageReceiver from '@/components/MessageReceiver.vue'
import MessageSender from '@/components/MessageSender.vue'

export default {
  name: 'QueueClient',
  components: {
    MessageReceiver,
    MessageSender
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
        this.connectToQueue()
      }
    },
    connectToQueue () {
      this.qClient = this.sbClient.createQueueClient(this.qName)
      console.log('Connected to QueueClient')
    }
  },
  watch: {
    sbClient () {
      if (this.sbClient) {
        this.connectToQueue()
      }
    }
  },
  created () {
    console.log('QueueClient component created')
    if (localStorage.getItem('qName')) {
      this.qName = localStorage.getItem('qName')
    }
  }
}
</script>

<style>
</style>
