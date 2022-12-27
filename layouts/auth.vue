<template>
  <main>
    <div class="bg-white shadow-md py-4 px-6 col-span-12 flex md:hidden">
      <div class="flex-grow">
        <a href="/home"> <img :src="logo" class="inline-block h-8 w-8" /></a>
      </div>
      <button
        class="focus:outline-none"
        @click.prevent="$router.push('/login')"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block my-auto"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.7958 1.19001C16.068 0.917782 16.068 0.476407 15.7958 0.204174C15.5236 -0.0680581 15.0822 -0.0680581 14.81 0.204174L8 7.01414L1.19006 0.204205C0.917829 -0.0680275 0.476453 -0.0680275 0.204221 0.204205C-0.0680113 0.476437 -0.0680113 0.917813 0.204221 1.19005L7.01416 7.99998L0.204175 14.81C-0.0680582 15.0822 -0.0680582 15.5236 0.204175 15.7958C0.476407 16.068 0.917782 16.068 1.19001 15.7958L8 8.98582L14.81 15.7958C15.0822 16.0681 15.5236 16.0681 15.7958 15.7958C16.0681 15.5236 16.0681 15.0822 15.7958 14.81L8.98584 7.99998L15.7958 1.19001Z"
            fill="#006696"
          />
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-12 sm:space-x-12 lg:space-x-16 min-h-screen">
      <div class="bg-blue-200 md:col-span-4 h-full hidden md:flex">
        <div class="text-center mx-24 mt-12 mb-10">
          <a href="/home"><img :src="logo" class="inline-block" /></a>
          <content-slider class="mt-20">
            <div>
              <img src="/auth-bg.png" class="inline-block" />
            </div>
            <h2 class="font-bold leading-none mt-8">
              Accept monthly recurring donations
            </h2>
            <p class="text-gray-600 pt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              eget enim euismod, pellentesque ante quis, bibendum nulla.
            </p>
          </content-slider>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8 h-full px-6 md:px-0">
        <Nuxt />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/static/WFXSingleSingle.png'),
    }
  },
}
</script>

<style scoped>
@media (max-width: 425px) {
  .min-h-screen {
    min-height: calc(100vh - 64px);
  }
}
</style>
