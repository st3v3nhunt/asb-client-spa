<template>
  <div>
    <form @submit.prevent="checkForm">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Enter message" v-model.trim="message"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-success" :disabled="!qClient">Send Message</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MessageSender',
  data () {
    return {
      errors: [],
      message: null,
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
    async sendMessage () {
      if (!this.sender) {
        this.sender = this.qClient.createSender()
      }
      await this.sender.send({ body: JSON.parse(this.message) })
      console.log('Sending message', this.message)
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
