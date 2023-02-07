<template>
    <div>
    <div class="flex flex-wrap flex_row mb-btw">
      <div
        v-for="item in organisations"
        :key="item"
        class="
          bg-white
          max-w-[380px]
          md:w-[380px]
          w-full
          h-[430px]
          flex flex-col
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
          <img class="h-48 w-48 mx-auto" :src="item?.logo" alt />
        </div>
        <p class="font-bold text-base mb-tp5 text-[#1E202A] mb-8">
          {{item.name}}
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
          :to="/organizations/ + item.id"
        >
          Expand
        </nuxt-link>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  props: {
    organisations: { type: Array, default: [] }
  },
  data() {
    return {
      donations: 9,
    }
  },
}
</script>
