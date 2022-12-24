<template>
  <div class="flex flex-col border border-gray-300 text-center p-8">
    <span class="icon-round mx-auto mb-8"></span>
    <div class="leading-tight">
      <p class="title text-lg font-semibold mb-5">{{ title }}</p>
    </div>
    <v-button
      outline
      size="sm"
      class="mt-auto w-max mx-auto"
      @click.prevent="clickHandler"
    >
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
.title {
  max-width: 135px;
  display: inline-block;
}
.icon-round {
  width: 120px;
  height: 120px;
  display: inline-block;
  border-radius: 60px;
  background-image: url('/icon/started-icon.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  @apply bg-blue-200;
}
</style>
