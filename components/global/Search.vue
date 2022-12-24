<template>
  <div class="relative font-bold text-gray-800">
    <input
      class="relative border border-gray-300 pl-9 py-2 outline-none w-full md:w-72"
      :placeholder="placeholder"
      :value="value"
      @change="onChange"
    />
    <span class="inline-flex absolute mt-3 ml-3 left-0 select-text z-0">
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.861 15.184l-3.888-3.888a6.795 6.795 0 001.674-4.474A6.83 6.83 0 006.825 0 6.83 6.83 0 00.003 6.822c0 3.76 3.062 6.822 6.822 6.822 1.71 0 3.275-.631 4.474-1.674l3.888 3.888a.482.482 0 00.337.142.48.48 0 00.337-.816zM.957 6.822A5.87 5.87 0 016.822.958a5.87 5.87 0 015.864 5.864c0 3.232-2.629 5.868-5.864 5.868A5.874 5.874 0 01.957 6.822z"
          fill="#767E85"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: 'VSearch',

  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search',
    },
  },

  methods: {
    onChange(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style scoped>
input {
  max-height: 40px;
}
button {
  background-image: url('/icon/page-back.svg');
  background-position: 50%;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  margin-bottom: 4.5px;
  margin-right: 10px;
  cursor: pointer;
}
button:focus,
button:active,
button:hover {
  border: 0;
  outline: none;
  box-shadow: none;
}
</style>
