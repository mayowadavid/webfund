<template>
  <button @click="$emit('go-back')" class="cursor-pointer">
    <i v-html="backIcon" />
  </button>
</template>

<script>
export default {
  name: 'VBackButton',

  data() {
    return {
      backIcon: require('~/static/icon/page-back.svg?raw'),
    }
  },
}
</script>

<style scoped>
button > i {
  width: 24px;
  height: 24px;
}
button:focus,
button:active,
button:hover {
  border: 0;
  outline: none;
  box-shadow: none;
}
</style>
