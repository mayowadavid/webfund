<template>
  <div class="flex flex-col relative w-full">
    <ul
      class="
        tag-header
        flex
        items-center
        gap-x-5
        md:gap-x-0
        relative
        w-full
        border-b
        pb-5
      "
    >
      <li
        class="
          tab-bar
          hidden
          md:flex
          absolute
          transition-all
          duration-300
          bottom-0
          h-10
          -mb-3
          border-blue-500
        "
        :style="{ left: position + 'px', width: width + 'px' }"
      ></li>

      <li
        v-for="(tab, index) in items"
        :key="`tag-${index}`"
        ref="tabsHeader"
        :class="{
          'text-blue-500': active === index,
          'text-gray-600': active !== index,
        }"
        class="
          hidden
          md:flex
          cursor-pointer
          text-center
          mr-12
          font-medium
          text-xl
        "
        @click="setActiveTab(index)"
      >
        {{ tab }}
      </li>
      <div class="flex flex-grow relative md:hidden">
        <select
          class="
            flex
            w-full
            text-blue-500
            font-medium
            border border-blue-500
            pl-4
            py-2
            pr-6
            appearance-none
          "
          @change="setActiveTab"
        >
          <option v-for="(tab, index) in items" :key="index" :value="index">
            {{ tab }}
          </option>
        </select>
        <svg
          class="absolute text-blue-500 right-0 mt-4 mr-4 select-none"
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.43909 9.12944L15.8272 1.74127C16.0635 1.49668 16.0567 1.10693 15.8121 0.870706C15.5735 0.640258 15.1952 0.640258 14.9567 0.870706L8.00381 7.82359L1.05093 0.870706C0.810529 0.630338 0.420774 0.630338 0.180371 0.870706C-0.0599956 1.11115 -0.0599956 1.50086 0.180371 1.74127L7.56853 9.12944C7.80897 9.3698 8.19868 9.3698 8.43909 9.12944Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <slot name="right" />
    </ul>
    <div ref="tabsContent" class="tab-content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import { addClass, removeClass, hasClass } from '~/utils'

export default {
  name: 'VTabs',
  props: {
    active: { type: [Number, String], default: 0 },
    items: { type: Array, required: true },
  },
  data() {
    return {
      position: null,
      width: null,
      init: false,
    }
  },
  mounted() {
    this.setActiveTab(0)
  },
  updated() {
    // do initial setup
    const tab = this.$refs.tabsContent?.childNodes[0]

    if (!this.init && !hasClass('active', tab)) {
      this.init = true
      this.setActiveTab(0)
    }
  },
  methods: {
    setActiveTab(index) {
      // get index from event
      if (index instanceof Event) {
        index = index.target.value
      }
      const tabHeader = this.$refs.tabsHeader[index]
      this.position = tabHeader.offsetLeft
      this.width = tabHeader.offsetWidth

      this.$emit('update:active', Number(index))

      const tabsContent = this.$refs.tabsContent?.childNodes
      if (typeof tabsContent === 'object') {
        tabsContent.forEach((tab, i) => {
          // //console.log(i, tab)
          addClass('active', tab)
          if (i === Number(index)) addClass('active', tab)
          else removeClass('active', tab)
        })
      }
    },
  },
}
</script>

<style scoped>
.tabs {
  display: flex;
}
.tab-bar {
  margin-bottom: -1.5px;
  border-bottom-width: 3px;
}
.tab-content-wrapper > *:not(.active) {
  display: none;
}
</style>
