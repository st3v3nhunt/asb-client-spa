<template>
  <div id="app" class="container">
    <connection @create:queueClient="setQueueClient"/>
  </div>
</template>

<script>
import Connection from '@/components/Connection.vue'

export default {
  name: 'App',
  components: {
    Connection
  },
  data () {
    return {
      queueClient: null
    }
  },
  methods: {
    setQueueClient (queueClient) {
      this.queueClient = queueClient
    }
  }
}
</script>

<style>
</style>
