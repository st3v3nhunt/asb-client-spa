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
          <div class="field">
            <div class="control">
              <textarea class="textarea" placeholder="Enter message" v-model.trim="message" rows="8"></textarea>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="control">
                <button class="button is-success is-fullwidth" :disabled="!qClient">Send Message</button>
              </div>
            </div>
            <div class="column">
              <div class="control">
                <button class="button is-warning is-fullwidth" :disabled="messages.length === 0" @click="clearMessages">Clear Sent Messages</button>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="control">
                <p :class="{ 'is-invisible': messages.length === 0 }">Messages sent: {{ messages.length }}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <article v-for="(message, index) in messages" :key="index" class="message is-small">
          <div class="message-body">{{ message }}</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageSender',
  data () {
    return {
      errors: [],
      message: null,
      messages: [],
      sender: null
    }
  },
  props: {
    qClient: Object
  },
  methods: {
    checkForm () {
      this.errors = []
      // TODO: add some validation
      console.log('validation pending...')

      if (!this.errors.length) {
        localStorage.setItem('message', this.message)
        this.sendMessage()
      }
    },
    clearMessages () {
      this.messages = []
    },
    async sendMessage () {
      if (!this.sender) {
        this.sender = this.qClient.createSender()
      }
      try {
        await this.sender.send({ body: JSON.parse(this.message) })
        this.messages.unshift(this.message)
        console.log('Sending message', this.message)
      } catch (err) {
        console.error('Error during message sending', err)
      }
    }
  },
  created () {
    console.log('MessageSender component created')
    if (localStorage.getItem('message')) {
      this.message = localStorage.getItem('message')
    }
  },
  watch: {
    async qClient () {
      if (this.qClient) {
        this.sender = this.qClient.createSender()
      } else {
        this.sender = null
      }
    }
  }
}
</script>

<style>
</style>
