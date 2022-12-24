<template>
  <div
    v-show="show"
    :key="key"
    class="modal fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        v-if="backdrop"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click.prevent="backDropClicked"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg max-w-[400px] w-full"
      >
        <div v-if="title || !hideClose" class="modal-title">
          <h4 v-if="title" class="font-semibold">{{ title }}</h4>
          <button
            class="flex absolute right-4 my-auto p-2 focus:outline-none"
            @click.prevent="closeModal"
          >
            <svg
              class="text-gray-500"
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.796 1.19a.697.697 0 00-.986-.986L8 7.014 1.19.204a.697.697 0 10-.986.986L7.014 8l-6.81 6.81a.697.697 0 10.986.986L8 8.986l6.81 6.81a.697.697 0 10.986-.986L8.986 8l6.81-6.81z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VModal',

  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: null },
    backdrop: { type: [Boolean, String], default: true },
    hideClose: { type: Boolean, default: false },
  },

  data() {
    return {
      key: new Date().getTime(),
    }
  },

  watch: {
    show(val, oldVal) {
      if (oldVal && !val) this.setNewKey()
    },
  },

  methods: {
    setNewKey() {
      this.key = new Date().getTime()
    },
    closeModal() {
      this.$emit('hide')
    },
    backDropClicked() {
      if (this.backdrop && this.backdrop !== 'static') {
        this.closeModal()
      }
    },
  },
}
</script>

<style scoped>
.modal {
  z-index: 2002;
}
.modal-title {
  @apply flex flex-row relative py-4 px-6 sm:px-8 border-b border-gray-200;
}
.modal-body {
  min-height: 100px;
  @apply py-6 sm:py-8 px-6 sm:px-8;
}
</style>
