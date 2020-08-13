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
    </div>
    <div class="columns">
      <div class="column">
        <message-receiver :qClient="qClient"/>
      </div>
    </div>
  </div>
</template>

<script>
import MessageReceiver from '@/components/MessageReceiver.vue'

export default {
  name: 'QueueClient',
  components: {
    MessageReceiver
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
      console.log(`Connected to queue '${this.qName}'...`)
    }
  },
  created () {
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
