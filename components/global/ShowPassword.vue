<template>
  <div ref="password" class="relative">
    <slot />
    <button :class="type === 'text' ? 'on' : 'off'" @click="showPassword" />
  </div>
</template>

<script>
export default {
  name: 'ShowPassword',
  data() {
    return {
      type: 'password',
    }
  },
  methods: {
    showPassword(e) {
      if (e) e.preventDefault()
      const input = this.$refs.password.childNodes[0]
      if (this.type === 'password') {
        this.type = 'text'
        input.setAttribute('type', this.type)
      } else {
        this.type = 'password'
        input.setAttribute('type', this.type)
      }
    },
  },
}
</script>

<style scoped>
button {
  width: 20px;
  height: 20px;
  outline: none;
  top: calc(50% - 10px);
  right: 12px;
  border: 0;
  position: absolute;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50%;
}
button.on {
  background-image: url('/icon/eye-on.svg');
}
button.off {
  background-image: url('/icon/eye-off.svg');
}
.relative {
  position: relative;
}
</style>
