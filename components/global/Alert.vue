<template>
  <div class="relative px-4 py-2" :class="`bg-${color}-200`">
    <p class="text-sm font-semibold pr-8" :class="`text-${color}-600`">
      {{ message }}
    </p>
    <button
      v-if="dismissable"
      class="absolute focus:outline-none"
      :class="`text-${color}-600`"
      @click.prevent="dismiss"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.7958 1.19001C16.068 0.917782 16.068 0.476407 15.7958 0.204174C15.5236 -0.0680581 15.0822 -0.0680581 14.81 0.204174L8 7.01414L1.19006 0.204205C0.917829 -0.0680275 0.476453 -0.0680275 0.204221 0.204205C-0.0680113 0.476437 -0.0680113 0.917813 0.204221 1.19005L7.01416 7.99998L0.204175 14.81C-0.0680582 15.0822 -0.0680582 15.5236 0.204175 15.7958C0.476407 16.068 0.917782 16.068 1.19001 15.7958L8 8.98582L14.81 15.7958C15.0822 16.0681 15.5236 16.0681 15.7958 15.7958C16.0681 15.5236 16.0681 15.0822 15.7958 14.81L8.98584 7.99998L15.7958 1.19001Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'VAlert',
  props: {
    color: { type: String, default: 'blue' },
    message: { type: String, required: true },
    dismissable: { type: Boolean, default: false },
  },
  methods: {
    dismiss() {
      // destroy the vue listeners, etc
      // this.$destroy()

      // remove the element from the DOM
      // this.$el.parentNode.removeChild(this.$el)

      // emit object removal
      this.$emit('dismiss', null)
    },
  },
}
</script>

<style scoped>
svg {
  width: 13px;
  height: 13px;
}
button {
  top: 12px;
  right: 13px;
}
</style>
