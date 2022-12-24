<template>
  <button
    :type="type"
    :disabled="loading"
    class="btn"
    :class="{
      [`border border-${variant}-500`]: true,
      [`bg-${variant}-600 text-white`]: !outline && variant !== 'light',
      [`text-${variant}-500`]: outline && variant !== 'light',
      [`bg-transparent`]: outline || variant === 'light',
      [`text-gray-500 border border-gray-300`]: variant === 'light',
      'w-full': block,
      [`btn-${size}`]: size,
      'btn-loading': loading,
    }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VButton',

  props: {
    type: {
      type: String,
      default: 'submit',
    },

    variant: {
      type: String,
      default: 'blue',
    },

    loading: {
      type: Boolean,
      default: false,
    },

    block: {
      type: Boolean,
      default: false,
    },

    outline: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped>
.btn {
  padding: 13.5px 36px;
  @apply font-medium;
}

.btn:hover,
.btn:focus {
  outline: none;
}

.btn-sm {
  @apply py-2 px-5;
}

.btn-xs {
  @apply py-1 px-5;
}

.btn.btn-primary.shadow {
  box-shadow: 0 10px 36px rgba(249, 158, 66, 0.42);
}

.btn.btn-light-600.btn-sm {
  padding: 8.5px 25px;
  @apply text-sm font-semibold rounded-lg;
  @apply text-black bg-gray-300;
}

.btn-loading {
  position: relative;
  pointer-events: none;
  color: transparent !important;
}

.btn-loading::after {
  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  content: '';
  display: block;
  height: 1em;
  width: 1em;
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
