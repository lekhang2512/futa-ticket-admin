<template>
  <fragment>{{value}}</fragment>
</template>
<script>
export default {
  name: 'AsyncDisplay',
  props: ['callback', 'args'],
  data () {
    return {
      value: ''
    }
  },
  beforeMount: async function() {
    if (Array.isArray(this.args)) {
      this.value = await this.callback(...this.args)
    } else {
      this.value = await this.callback(this.args)
    }

  }
}
</script>
