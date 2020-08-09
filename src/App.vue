<template>
  <div id="app" class="container">
    <Connection/>
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
  }
}
</script>

<style>
</style>
