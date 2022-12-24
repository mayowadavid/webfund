<template>
  <div class="flex">
    <div class="relative lg:w-1/2 lg:mr-auto lg:sticky top-0">
      <div class="pt-5 lg:pt-8 relative">
        <h1 class="font-bold text-blue-500">{{ title }}</h1>
        <p class="text-base md:text-lg text-gray-500 mt-2">{{ subTitle }}</p>
      </div>
    </div>
    <div v-if="!hideProgress" class="text-right pt-5 lg:pt-8 ml-6">
      <progress-circle-step :step="step" :steps="stepsValue" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    subTitle: { type: String, default: null },
    hideProgress: { type: Boolean, default: false },
    steps: { type: [Array, Number], default: 0 },
    step: { type: Number, default: 0 },
  },
  computed: {
    stepsValue() {
      return typeof this.steps === 'object' ? this.steps : new Array(this.steps)
    },
  },
}
</script>
