<template>
  <div id="app" class="container is-fluid">
    <service-bus-client />
  </div>
</template>

<script>
import ServiceBusClient from '@/components/ServiceBusClient.vue'

export default {
  name: 'App',
  components: {
    ServiceBusClient
  },
  data () {
    return {
      /* qclient: null */
    }
  },
  methods: {
    /* setQueueClient (qclient) { */
    /*   this.qclient = qclient */
    /* } */
  }
}
</script>

<style>
</style>
