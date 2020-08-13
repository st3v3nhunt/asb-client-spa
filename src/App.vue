<template>
  <section class="section">
    <div class="container is-fluid">
      <service-bus-client @create:serviceBusClient="setServiceBusClient"/>
      <queue-client :sbClient="sbClient"/>
    </div>
  </section>
</template>

<script>
import QueueClient from '@/components/QueueClient.vue'
import ServiceBusClient from '@/components/ServiceBusClient.vue'

export default {
  name: 'App',
  components: {
    QueueClient,
    ServiceBusClient
  },
  data () {
    return {
      sbClient: null
    }
  },
  methods: {
    setServiceBusClient (sbClient) {
      this.sbClient = sbClient
    }
  }
}
</script>

<style>
</style>
