<template>
  <div v-click-outside="closeDropdown" class="flex-inline flex-col relative">
    <button
      class="
        flex
        px-4
        border border-blue-500
        my-auto
        text-blue-500
        outline-none
        focus:outline-none
        my-auto
      "
      @click.prevent="toggleOpen"
      @keydown.esc.exact="closeDropdown"
    >
      <span class="flex-inline my-auto mr-3">{{ label }}</span>
      <svg
        class="my-auto"
        width="16"
        height="10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.439 9.13l7.388-7.389a.616.616 0 00-.87-.87L8.004 7.824 1.05.87a.616.616 0 00-.87.87L7.567 9.13c.24.24.63.24.871 0z"
          fill="#0396C2"
        />
      </svg>
    </button>
    <div
      ref="dropdown"
      class="bg-white absolute shadow-xl p-5 w-64 md:w-72 z-10"
      :class="{ hidden: !open }"
    >
      <div class="font-medium text-gray-500 pb-4 border-b border-gray-200">
        {{ label }}
      </div>
      <div class="pt-1 pb-3">
        <div
          v-for="(filter, index) in filters"
          :key="index"
          :class="{ 'text-blue-500 font-medium bg-blue-200': value === filter }"
          class="
            flex
            text-gray-800
            cursor-pointer
            rounded-md
            mt-3
            px-4
            md:px-5
            py-2
          "
          @click.prevent="setFilter(filter)"
        >
          <div class="text-base leading-tight">
            {{ filter }}
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4 mt-5">
        <v-button :loading="loading" size="sm" @click.prevent="applyFilter">
          Apply Filter
        </v-button>
        <button
          type="button"
          class="
            border border-blue-500
            btn-sm
            text-blue-500
            flex-grow
            focus:outline-none
          "
          @click.prevent="setFilter('')"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VFilter',

  props: {
    value: { type: String, default: '' },
    label: { type: String, required: true },
    filters: { type: Array, required: true },
    callback: { type: Function, default: null },
    loading: { type: Boolean, default: false },
  },

  data() {
    return {
      open: false,
    }
  },

  methods: {
    toggleOpen() {
      this.open = !this.open

      setTimeout(() => {
        this.$emit('toggle', this.open)
      }, 100)

      const elem = this.$refs.dropdown
      const pos = elem.parentElement.getBoundingClientRect()
      const rightAlign = pos.left + 260 > document.body.offsetWidth
      const bottomAlign = pos.top + 300 > document.body.offsetHeight
      const xposDir = rightAlign ? 'right' : 'left'
      const yposDir = bottomAlign ? 'bottom' : 'top'
      // const xpos = rightAlign ? document.body.offsetWidth - pos.right : pos.left
      // const ypos = bottomAlign ? pos.top + pos.height : pos.top
      // console.log(document.body.offsetWidth, elem.offsetWidth, pos)
      elem.style[xposDir] = `${0}px`
      elem.style[yposDir] = `${0}px`
      // patch position
      // if (!rightAlign) elem.parentElement.style.position = 'relative'
    },
    closeDropdown() {
      if (this.open) {
        this.open = false
        this.$emit('toggle', this.open)
      }
    },
    setFilter(value) {
      this.$emit('input', value)
    },
    applyFilter() {
      if (this.callback) this.callback()
    },
  },
}
</script>

<style scoped>
button {
  min-height: 40px;
}
</style>
