<template>
  <div>
    <div ref="sliders" class="sliders">
      <slot />
    </div>
    <div class="navs block text-center mt-8">
      <ul>
        <li><a></a></li>
        <li class="active"><a></a></li>
        <li><a></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    autoplay: { type: Boolean, default: false },
  },
  data() {
    return {
      active: 0,
      sliders: [0],
    }
  },
  methods: {
    next() {},
    prev() {},
  },
}
</script>

<style scoped>
.navs ul {
  display: inline-block;
  height: 16px;
  vertical-align: middle;
}
.navs ul li {
  margin-right: 10px;
}
.navs ul li,
.navs ul li a {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 8px;
  vertical-align: top;
  cursor: pointer;
}
.navs ul li:last-child {
  margin-right: 0;
}
.navs ul li a {
  background-color: #0396c2;
  opacity: 0.38;
}
.navs ul li.active a {
  opacity: 1;
}
</style>
