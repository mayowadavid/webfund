<template>
  <div ref="notifications" class="flex flex-col relative">
    <button
      variant="light"
      class="my-auto text-left outline-none focus:outline-none my-auto"
      @click="toggleOpen"
      @keydown.esc.exact="closeNotification"
      v-click-outside="closeNotification"
    >
      <svg
        width="20"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.404 0A2.503 2.503 0 007.19 3.66c-3.271.96-5.667 3.988-5.667 7.565v7.556H.815a.815.815 0 100 1.631H6.47v.598A2.993 2.993 0 009.459 24a2.993 2.993 0 002.99-2.99v-.598h5.762a.815.815 0 100-1.63h-.924v-7.557c0-3.577-2.396-6.606-5.667-7.565A2.503 2.503 0 009.405 0zm1.414 20.412H8.1v.598c0 .75.61 1.36 1.359 1.36s1.359-.61 1.359-1.36v-.598zM9.404 3.343c.068 0 .135.001.202.003a.884.884 0 00.668-.845.881.881 0 00-.87-.87.881.881 0 00-.87.87c0 .402.29.751.669.845l.201-.003zm-6.251 7.882A6.26 6.26 0 019.09 4.982a2.513 2.513 0 00.626 0 6.26 6.26 0 015.939 6.243v7.556H3.153v-7.556z"
          fill="#767E85"
        />
      </svg>
    </button>
    <div
      class="bg-white absolute top-8 right-0 shadow-xl w-72 md:w-96 z-10"
      :class="{ hidden: !open }"
    >
      <h4
        class="
          font-bold
          text-center text-blue-800
          py-4
          px-8
          border-b border-gray-200
        "
      >
        Notifications
      </h4>
      <div class="pb-3">
        <a
          v-for="(notice, index) in [0, 1, 2, 3]"
          :key="index"
          href="#"
          class="
            flex
            text-gray-800
            block
            px-4
            md:px-5
            py-4
            border-b border-gray-200
          "
        >
          <p class="text-base leading-tight">
            <span class="status success mr-1 align-text-top">New</span> New
            donation on your
            <strong class="font-medium"
              >church alter re-construction campaign</strong
            >. Check the the donation been made to your campaign
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    }
  },

  methods: {
    toggleOpen(e) {
      if (e) e.preventDefault()
      this.open = !this.open
    },
    closeNotification() {
      this.open = false
    },
  },
}
</script>
