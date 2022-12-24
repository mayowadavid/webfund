<template>
  <label :for="id || name" class="form-checkbox">
    <input
      :id="id || name"
      :type="type"
      :name="name"
      :checked="isChecked"
      :value="value"
      class="custom-control-input"
      :class="{ 'is-checked': isChecked }"
      @change="onChange"
    />
    <span class="my-auto">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'VCheckbox',

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    type: { type: String, default: 'checkbox' },
    id: { type: String, default: null },
    name: { type: String, required: true },
    value: { type: String, required: true },
    checked: { type: [Boolean, String, Array], default: false },
  },

  computed: {
    isChecked() {
      return this.checked && typeof this.checked === 'object'
        ? this.checked.includes(this.value)
        : typeof this.checked === 'boolean'
        ? this.checked
        : this.checked === this.value
    },
    changed() {
      if (this.checked && this.checked.includes(this.value)) {
        return [...this.checked].filter((o) => o !== this.value)
      } else {
        return [...this.checked, this.value]
      }
    },
  },

  methods: {
    onChange(e) {
      const value =
        this.checked && typeof this.checked === 'object'
          ? this.changed
          : typeof this.checked === 'boolean'
          ? e.target.checked
          : this.value
      this.$emit('change', value)
    },
  },
}
</script>

<style scoped>
.form-checkbox input[type='checkbox'],
.form-checkbox input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  color: #26b872;
  background-color: #fff;
  border-color: #d1d5db;
  border-width: 1px;

}
.form-checkbox input[type='checkbox'] {
  border-radius: 2px;
}
.form-checkbox input[type='radio'] {
  border-radius: 100%;
}
.form-checkbox input[type='checkbox']:checked,
.form-checkbox input[type='radio']:checked {
  border-color: transparent;
  background-color: currentColor;
  background-position: center;
  background-repeat: no-repeat;
}
.form-checkbox input[type='checkbox']:checked {
  background-image: url("data:image/svg+xml,%3Csvg width='9' height='6' viewBox='0 0 9 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.10812 0.16319C8.30267 0.371015 8.29191 0.697205 8.08408 0.891756L3.12849 5.53085C2.92922 5.71738 2.61909 5.71624 2.4212 5.52825L0.160437 3.38052C-0.0459546 3.18445 -0.0543203 2.85819 0.141751 2.6518C0.337823 2.44541 0.664083 2.43704 0.870474 2.63311L2.77882 4.44604L7.37955 0.139156C7.58738 -0.0553952 7.91357 -0.0446349 8.10812 0.16319Z' fill='white'/%3E%3C/svg%3E%0A");
}
.form-checkbox input[type='radio']:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  background-size: 100% 100%;
}
span {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
