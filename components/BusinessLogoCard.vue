<template>
  <div class="border border-gray-300 text-center p-8">
    <span class="icon-round mb-8"></span>
    <div class="leading-tight">
      <p class="title text-lg font-bold mb-5">Add Business Logo</p>
    </div>
    <v-button type="button" outline size="sm">Upload Logo</v-button>
  </div>
</template>

<script>
export default {
  props: {
    callback: { type: Function, default: () => {} },
  },
}
</script>

<style scoped>
.title {
  max-width: 135px;
  display: inline-block;
}
.icon-round {
  width: 120px;
  height: 120px;
  display: inline-block;
  border-radius: 60px;
  background-image: url('/icon/started-icon.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  @apply bg-blue-200;
}
</style>
