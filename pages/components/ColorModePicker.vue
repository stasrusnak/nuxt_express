<template>
  <div>
    <ul>

      <li
        v-for="color of colors"
        :key="color"
        @click="$colorMode.preference = color"
      >{{color}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ColorModePicker",
    data() {
      return {
        colors: ['system', 'light', 'dark', 'sepia']
      }
    }
  }
</script>

<style scoped>

</style>
