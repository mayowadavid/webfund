<template>
  <div ref="password" class="relative">
    <slot />
    <button :class="type === 'text' ? 'on' : 'off'" @click="showPassword" />
  </div>
</template>

<script>
export default {
  name: 'CopyInputValue',
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
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.48962 12H13.4896C14.501 12 15.3229 11.178 15.3229 10.1666L15.3229 1.83337C15.3229 0.822021 14.501 0 13.4896 0L6.48962 0C5.47827 0 4.65625 0.822021 4.65625 1.83337L4.65625 10.1666C4.65625 11.178 5.47827 12 6.48962 12ZM5.65625 1.83337C5.65625 1.37402 6.03027 1 6.48962 1L13.4896 1C13.949 1 14.3229 1.37402 14.3229 1.83337L14.3229 10.1666C14.3229 10.626 13.949 11 13.4896 11H6.48962C6.03027 11 5.65625 10.626 5.65625 10.1666L5.65625 1.83337ZM2.48962 16L10.8229 16C11.8342 16 12.6563 15.178 12.6563 14.1666V13.8334C12.6563 13.5574 12.4323 13.3334 12.1563 13.3334C11.8802 13.3334 11.6563 13.5574 11.6563 13.8334V14.1666C11.6563 14.626 11.2822 15 10.8229 15L2.48962 15C2.03027 15 1.65625 14.626 1.65625 14.1666L1.65625 5.16663C1.65625 4.70728 2.03027 4.33337 2.48962 4.33337H2.82288C3.09888 4.33337 3.32288 4.10938 3.32288 3.83337C3.32288 3.55737 3.09888 3.33337 2.82288 3.33337H2.48962C1.47827 3.33337 0.65625 4.15527 0.65625 5.16663L0.65625 14.1666C0.65625 15.178 1.47827 16 2.48962 16Z' fill='%23767E85'/%3E%3C/svg%3E%0A");
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50%;
}
.relative {
  position: relative;
}
</style>
