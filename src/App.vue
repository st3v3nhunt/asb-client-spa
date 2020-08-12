<template>
  <section class="section">
    <div class="container is-fluid">
      <service-bus-client @create:serviceBusClient="setServiceBusClient"/>
      <message-viewer :sbClient="sbClient"/>
    </div>
  </section>
</template>

<script>
import ServiceBusClient from '@/components/ServiceBusClient.vue'
import MessageViewer from '@/components/MessageViewer.vue'

export default {
  name: 'App',
  components: {
    MessageViewer,
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
