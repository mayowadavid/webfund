<template>
  <div class="flex border border-gray-300 pr-5 md:pr-6 px-6 py-5 md:py-6">
    <span class="icon-round my-auto hidden md:inline-block"></span>
    <div class="leading-tight flex-grow md:ml-5 my-auto">
      <p class="title md:text-lg font-semibold">{{ title }}</p>
    </div>
    <v-button outline size="sm" class="my-auto" @click.prevent="clickHandler">
      {{ button }}
    </v-button>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    button: { type: String, required: true },
  },
  methods: {
    clickHandler(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped>
.icon-round {
  width: 40px;
  height: 40px;
  border-radius: 60px;
  background-image: url('/icon/started-icon.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 45%;
  @apply bg-blue-200;
}
</style>
