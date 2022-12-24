<template>
  <!-- https://codepen.io/JMChristensen/pen/Ablch -->
  <div class="flex md:flex-col">
    <div id="progress-bar" :data-pct="status">
      <svg
        width="60"
        height="60"
        viewPort="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="26"
          cx="30"
          cy="30"
          fill="transparent"
          :stroke-dasharray="163.27"
          stroke-dashoffset="0"
        ></circle>
        <circle
          r="26"
          cx="30"
          cy="30"
          fill="transparent"
          :stroke-dasharray="163.27"
          stroke-dashoffset="0"
          :style="{ strokeDashoffset: barStroke }"
        ></circle>
      </svg>
    </div>
    <ul
      v-if="showSteps"
      class="steps mt-6 lg:mt-6 md:flex md:flex-col md:mr-auto"
    >
      <li
        v-for="(stp, index) in steps"
        :key="index"
        :class="{
          active: $device.isMobile ? index + 1 === step : index + 1 <= step,
        }"
      >
        {{ stp }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
    steps: {
      type: Array,
      required: true,
    },
    showSteps: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    status() {
      return this.step + '/' + this.steps.length
    },
    barStroke() {
      const p = (100 / this.steps.length) * this.step
      const c = Math.PI * (26 * 2)
      return ((100 - p) / 100) * c
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
div#progress-bar {
  display: inline-block;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  position: relative;
}
div#progress-bar::after {
  position: absolute;
  display: inline-block;
  text-align: center;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  left: 0;
  top: 0;
  content: attr(data-pct);
  font-weight: 600;
  margin-top: 23px;
  margin-left: 5px;
  border-radius: 100%;
  line-height: 106%;
  @apply text-blue-600;
}

.steps > li {
  color: #767e85;
  font-size: 14px;
  line-height: 22px;
  padding-left: 24px;
  margin-bottom: 10px;
  position: relative;
}
.steps > li:last-child {
  margin-bottom: 0;
}
.steps > li:first-child::after {
  display: none;
}
.steps > li::before {
  content: '';
  display: inline-block;
  position: absolute;
  width: 16px;
  height: 16px;
  left: 0;
  top: 2.5px;
  @apply border border-gray-400 rounded-full;
}
@media (min-width: 768px) {
  .steps > li::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 1px;
    height: 17px;
    left: 6.5px;
    bottom: 19px;
    @apply border border-gray-400;
  }
}

.steps > li.active {
  font-weight: 600;
  @apply text-blue-600;
}
.steps > li.active::before {
  background-image: url('/icon/checked-tick.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  @apply bg-green-500 border-green-500;
}
.steps > li.active::after {
  @apply border-green-500;
}
@media (max-width: 425px) {
  .steps > li::before,
  .steps > li:not(.active) {
    display: none;
  }
}
</style>
