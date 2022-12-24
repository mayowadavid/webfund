<template>
  <!-- https://codepen.io/JMChristensen/pen/Ablch -->
  <div
    :data-pct="percentage + '%'"
    :style="{
      width: size + 'px',
      height: size + 'px',
      fontSize: size / 5 + 3.5 + 'px',
    }"
  >
    <svg
      :width="size"
      :height="size"
      viewPort="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        :r="circleRadius"
        :cx="circleSize"
        :cy="circleSize"
        fill="transparent"
        :stroke-dasharray="size * 2.8274"
        stroke-dashoffset="0"
      ></circle>
      <circle
        :r="circleRadius"
        :cx="circleSize"
        :cy="circleSize"
        fill="transparent"
        :stroke-dasharray="size * 2.8274"
        stroke-dashoffset="0"
        :style="{ strokeDashoffset: barStroke }"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 45,
    },
    size: {
      type: Number,
      default: 90,
    },
  },
  computed: {
    percentage() {
      return isNaN(this.progress)
        ? 100
        : this.progress < 0
        ? 0
        : this.progress > 100
        ? 100
        : this.progress
    },
    circleSize() {
      return this.size / 2
    },
    circleRadius() {
      return this.size / 2 - 4
    },
    barStroke() {
      const c = Math.PI * (this.circleRadius * 2)
      return ((100 - this.percentage) / 100) * c
    },
  },
}
</script>

<style scoped>
svg circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke: #e1f7fe;
  stroke-width: 2px;
}
svg circle:last-child {
  stroke: #f79d33;
  stroke-width: 4px;
}
div {
  display: inline-block;
  margin: auto;
  border-radius: 100%;
  position: relative;
}
div::after {
  position: absolute;
  display: inline-block;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  left: 50%;
  top: 50%;
  content: attr(data-pct);
  font-weight: 600;
  margin-top: -13%;
  margin-left: -22%;
  border-radius: 100%;
  line-height: 106%;
  @apply text-blue-600;
}
</style>
