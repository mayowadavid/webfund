<template>
  <h3 class="flex items-center font-bold text-gray-800 pt-6 lg:pt-0">
    <v-back-button
      v-if="showBackButton"
      @go-back="$router.go(-1)"
      class="hidden lg:inline-block"
    />
    <span v-if="$slots.default" :class="{ 'lg:ml-3': showBackButton }">
      <slot />
    </span>
  </h3>
</template>

<script>
export default {
  name: 'VNavTitle',

  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
