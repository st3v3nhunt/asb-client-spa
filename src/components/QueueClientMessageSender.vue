<template>
  <div>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="checkForm">
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
          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Enter message to send"
                v-model.trim="message"
                rows="8"
                ></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Enter UUID properties"
                v-model.trim="uuidProps"
                >
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="control">
                <button
                  class="button is-success is-fullwidth"
                  :disabled="!qClient"
                  >Send Message</button>
              </div>
            </div>
            <div class="column">
              <div class="control">
                <button
                  class="button is-warning is-fullwidth"
                  :disabled="messages.length === 0"
                  @click="clearMessages"
                  >Clear Sent Messages</button>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="control">
                <p :class="messages.length === 0 && 'is-invisible'">Messages sent: {{ messages.length }}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <article
          v-for="(message, index) in messages"
          :key="index"
          class="message is-small"
          >
          <div class="message-body">{{ message }}</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
const { v1: uuidv1 } = require('uuid')

function addUuidPropsToMessage (rawMessage, uuidProps) {
  const message = JSON.parse(rawMessage)
  if (uuidProps) {
    uuidProps.split(',').map(x => x.trim()).forEach(prop => {
      message[prop] = uuidv1()
    })
  }
  return message
}

export default {
  name: 'QueueClientMessageSender',

  data () {
    return {
      errors: [],
      message: null,
      messages: [],
      sender: null,
      uuidProps: null
    }
  },

  props: {
    qClient: Object
  },

  methods: {
    checkForm () {
      this.errors = []
      // TODO: add some validation
      console.log('Validation pending...')

      if (!this.errors.length) {
        localStorage.setItem('message', this.message)
        localStorage.setItem('uuidProps', this.uuidProps)
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
        const messageToSend = addUuidPropsToMessage(this.message, this.uuidProps)
        await this.sender.send({ body: messageToSend })
        this.messages.unshift(messageToSend)
        console.log('Sending message', messageToSend)
      } catch (err) {
        this.errors.push(err)
        console.error('Error during message sending', err)
      }
    }
  },

  created () {
    console.log('QueueClientMessageSender component created')
    if (localStorage.getItem('message')) {
      this.message = localStorage.getItem('message')
    }
    this.uuidProps = localStorage.getItem('uuidProps')
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
