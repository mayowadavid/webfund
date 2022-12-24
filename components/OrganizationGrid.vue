<template>
  <div>
    <div class="flex flex-wrap justify-between item-center">
      <div
        v-for="item in donations"
        :key="item"
        class="
          bg-white
          max-w-[380px]
          md:w-[380px]
          w-full
          h-[430px]
          flex flex-col
          items-center
          p-5
          mb-16
        "
      >
        <div
          class="
            w-full
            h-[242px]
            mb-10
            flex flex-col
            items-center
            justify-center
          "
        >
          <img class="h-48 w-48 mx-auto" src="/rccg-lg.png" alt />
        </div>
        <p class="font-bold text-base text-[#1E202A] mb-8">
          Redeem Christian Church of God
        </p>
        <nuxt-link
          class="
            h-[48px]
            mb-2
            font-semibold
            flex
            items-center
            justify-center
            px-10
            bg-[#006696]
            text-white text-sm
          "
          to="/organizations/122iucbss"
        >
          Expand
        </nuxt-link>
      </div>
    </div>
    <div class="flex justify-center">
      <a href="#" class="text-[#F79D33] font-bold text-base"
        >View More</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      donations: 9,
    }
  },
}
</script>
