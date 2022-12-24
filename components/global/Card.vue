<template>
  <div
    class="card"
    :class="{
      'p-7': !noPadding,
      'shadow-lg': shadow,
    }"
  >
    <div v-if="title" class="card-header">
      {{ title }}
    </div>

    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCard',

  props: {
    title: { type: String, default: null },
    noPadding: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 16px #efeff1;
  @apply flex flex-row bg-white rounded;
}
.card-header {
  @apply flex border-b border-gray-300;
}
.card-body {
  @apply flex flex-col flex-auto;
}
</style>
