<template>
  <section class="section">
    <div class="container is-fluid">
      <the-service-bus-client
        @create-service-bus-client="setServiceBusClient"
        @destroy-service-bus-client="destroyServiceBusClient"
        />
    </div>
  </section>
</template>

<script>
import TheServiceBusClient from '@/components/TheServiceBusClient.vue'

export default {
  name: 'App',

  components: {
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
