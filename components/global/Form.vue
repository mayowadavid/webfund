<template>
  <client-only>
    <validation-observer v-slot="{ handleSubmit }" ref="form" slim>
      <form :id="id" @submit.prevent="handleSubmit(triggerSubmit)">
        <slot name="header"></slot>
        <!-- Error messages -->
        <div v-if="errors">
          <!-- <h5 v-if="errorMessage" class="text-red-500 mb-3">
            {{ errorMessage }}
          </h5> -->
          <v-alert
            v-for="(err, key) in errors"
            :key="key"
            dismissable
            :message="err"
            color="red"
            :class="key + 1 == errors.length ? 'mb-5' : 'mb-3'"
            @dismiss="$delete(errors, key)"
          />
        </div>
        <!-- Success message -->
        <div v-if="success" class="mb-5">
          <v-alert
            dismissable
            :message="success"
            color="green"
            @dismiss="success = null"
          />
        </div>
        <slot />
        <slot name="footer"></slot>
      </form>
    </validation-observer>
  </client-only>
</template>

<script>
export default {
  name: 'VForm',

  props: {
    id: { type: String, default: null },
    data: { type: Object, default: null },
    loading: { type: Boolean, default: false },
    onSubmit: { type: Function, default: null },
    onSuccess: { type: Function, default: null },
    onError: { type: Function, default: null },
    successMessage: { type: String, default: null },
    errorMessage: { type: String, default: 'Invalid form submission' },
  },

  data: () => ({
    success: null,
    errors: null,
  }),
  /*
  watch: {
    data: {
      handler(value, oldVal) {
        Object.keys(value).forEach((val) => {
          //console.log('email watch 1', this.$refs.form.fields)
          if (!value[val]) {
            //console.log('email watch 2', value[val], oldVal[val])
            this.$refs.form.setErrors({ email: ['Nothing to show'] })
          }
        })
      },
      deep: true,
    },
  },
  */
  methods: {
    triggerSubmit(e) {
      // no callback trigger event
      if (!this.onSubmit) return this.$emit('submit', e)

      this.$emit('update:loading', true)

      this.onSubmit(e)
        .then((resp) => {
          this.errors = null
          this.$emit('update:loading', false)
          // only of promise return
          if (resp) {
            this.success =
              this.successMessage ||
              resp?.data?.message ||
              'Form submission was successful'
            if (this.onSuccess) this.onSuccess(resp)
            else this.$emit('success', resp)
          }
        })
        .catch((error) => {
          this.$emit('update:loading', false)
          let errors = _.get(error, 'response.data.errors', null)
          if (errors)
            errors = Object.values(errors).map((o) =>
              this.$options.filters.capitalize(o[0], {
                onlyFirstLetter: true,
              })
            )
          const message = this.$options.filters.capitalize(
            _.get(error, 'response.data.message', this.errorMessage),
            {
              onlyFirstLetter: true,
            }
          )
          this.errors = errors || [message]
          if (this.onError) this.onError(this.errors)
          this.$emit('error', this.errors)
        })
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
