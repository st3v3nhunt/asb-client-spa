<template>
  <section class="section">
    <div class="container is-fluid">
      <the-service-bus-client
        @create:serviceBusClient="setServiceBusClient"
        @destroy:serviceBusClient="destroyServiceBusClient"
        />
      <service-bus-queue-client :sbClient="sbClient"/>
    </div>
  </section>
</template>

<script>
import ServiceBusQueueClient from '@/components/ServiceBusQueueClient.vue'
import TheServiceBusClient from '@/components/TheServiceBusClient.vue'

export default {
  name: 'App',

  components: {
    ServiceBusQueueClient,
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
      this.$log.info('Destroying ServiceBusClient')
    },
    setServiceBusClient (sbClient) {
      this.sbClient = sbClient
    }
  }
}
</script>
