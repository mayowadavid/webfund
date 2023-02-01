<template>
  <div>
    <div
    v-for="item in organisations"
        :key="item">
    <div class="flex flex-wrap justify-between item-center">
      <div
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
          <img class="h-48 w-48 mx-auto" :src="item?.logo" alt />
        </div>
        <p class="font-bold text-base text-[#1E202A] mb-8">
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
    <div class="flex justify-center">
      <a :href="/organizations/ + item.id" class="text-[#F79D33] font-bold text-base"
        >View More</a
      >
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      donations: 9,
      organisations: [],
    }
  },
  async mounted() {
    // fetch campaign
    const res = await this.$store.dispatch('auth/fetchAllOrganization')
    if (res) {
      this.organisations = [...res.organisations]
    }
  },
}
</script>
