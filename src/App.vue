<template>
  <section class="section">
    <div class="container is-fluid">
      <the-service-bus-client
        @create:TheserviceBusClient="setServiceBusClient"
        @destroy:serviceBusClient="destroyServiceBusClient"
        />
      <queue-client :sbClient="sbClient"/>
    </div>
  </section>
</template>

<script>
import QueueClient from '@/components/QueueClient.vue'
import TheServiceBusClient from '@/components/TheServiceBusClient.vue'

export default {
  name: 'App',

  components: {
    QueueClient,
    TheServiceBusClient
  },

  data () {
    return {
      sbClient: null
    }
  },

  methods: {
    destroyServiceBusClient () {
      this.sbClient = null
      console.log('Destroying ServiceBusClient')
    },
    setServiceBusClient (sbClient) {
      this.sbClient = sbClient
    }
  }
}
</script>
