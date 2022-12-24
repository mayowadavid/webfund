<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative " v-bind:class="[transparent ? 'bg-transparent' : 'bg-white']">
    <div class="container mx-auto px-4 sm:px-0 md:px-5">
      <div
        class="flex justify-between items-center py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:mr-8">
          <a href="/home">
            <span class="sr-only">Wefundx.com</span>
            <img class="inline-block w-8 h-8" :src="logo" />
          </a>
        </div>
        <div class="-mr-2 -my-2 lg:hidden">
          <button
            type="button"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
            @click="toggleMenu"
          >
            <span class="sr-only">Open menu</span>
            <!-- Heroicon name: outline/menu -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav class="hidden lg:flex xl:space-x-10 space-x-5">
          <a
            v-for="(menu, index) in menu_items" :key="index"
            href="#"
            class="text-base font-medium text-gray-600 hover:text-gray-900"
          >
            {{ menu.title }}
          </a>
          <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
          <!-- <div class="relative">
            <button
              type="button"
              class="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none"
              aria-expanded="false"
            >
              <span>More</span>
            </button>
          </div> -->
        </nav>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a href="/login" class="whitespace-nowrap btn btn-primary-outline btn-sm">
            Sign in
          </a>
          <a
            href="#"
            class="ml-5 whitespace-nowrap btn btn-primary btn-sm inline-flex items-center justify-center"
          >
            Donate
          </a>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
    <div
      class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
      :class="{ hidden: !show }"
    >
      <div
        class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
      >
        <div class="pt-5 pb-6 px-5">
          <div class="flex items-center justify-between">
            <div>
              <nuxt-link to="/home">
                <img class="h-8 w-auto" :src="logo" alt="Wefundx.com" />
              </nuxt-link>
            </div>
            <div class="-mr-2">
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                @click="toggleMenu"
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="py-6 px-5 space-y-6">
          <div class="grid grid-cols-1 gap-y-4 gap-x-8">
            <a
              v-for="(menu, index) in menu_items"
              :key="index"
              href="#"
              class="text-base font-medium text-gray-900 hover:text-gray-700"
            >
              {{ menu.title }}
            </a>
          </div>
          <div class="space-y-5">
            <a href="/login" class="whitespace-nowrap btn btn-primary-outline btn-sm flex items-center justify-center w-full mb-4">
            Sign in
            </a>
            <a
            href="#"
            class="whitespace-nowrap btn btn-primary btn-sm flex items-center justify-center w-full"
            >
              Donate
            </a>
            <!-- <a
              href="#"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign up
            </a> -->
            <!-- <p class="mt-6 text-center text-base font-medium text-gray-500">
              Existing customer?
              <a href="#" class="text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    transparent:{type:Boolean, default:false}
  },
  data() {
    return {
      logo: require('@/static/logo.svg'),
      show: false,
      menu_items: [
        { title: 'Our Solution', link: '#' },
        { title: 'Support', link: '#' },
        { title: 'Developer', link: '#' },
        { title: 'Company', link: '#' },
        { title: 'Pricing', link: '#' },
        { title: 'Start a campaign', link: '#' },
      ],
    }
  },
  methods: {
    toggleMenu() {
      this.show = !this.show
    },
  },
}
</script>
