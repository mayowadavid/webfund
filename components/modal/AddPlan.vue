<template>
  <v-modal :show="show" title="Add plan" backdrop="static" @hide="hideModal">
    <div
      id="signup-form"
      ref="form"
    >
      <div class="form-group mb-5">
        <label for="input-name">Plan name</label>
        <div>
          <validation-provider
            v-slot="{ errors, classes }"
            name="name"
            rules="required"
          >
            <input
              id="input-name"
              v-model="form.name"
              class="form-input"
              :class="classes"
              placeholder="Enter title"
            />
            <span v-show="errors.length" class="is-invalid">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
      </div>
      <div class="form-group mb-5">
        <label for="input-amount">Minimum Amount</label>
        <div>
          <validation-provider
            v-slot="{ errors, classes }"
            name="amount"
            rules="required"
          >
            <input
              id="input-amount"
              v-model="form.amount"
              class="form-input"
              :class="classes"
              placeholder="Enter minimum amount"
            />
            <span v-show="errors.length" class="is-invalid">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
      </div>
      <div class="form-group mb-5">
        <label for="input-interval">Interval</label>
        <validation-provider
          v-slot="{ errors, classes }"
          name="recipient name"
          rules="required"
        >
          <div class="cs-select" :class="classes">
            <select v-model="form.interval" class="input">
              <option defaultValue hidden value="">Choose period</option>
              <option
                v-for="interval in interval_list"
                :key="interval"
                :value="interval"
              >
                {{ interval }}
              </option>
            </select>
          </div>
          <span v-show="errors.length" class="is-invalid">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </div>
      <div>
        <div class="flex flex-row mt-8">
          <button @click.prevent="onSubmit" :loading="loading" class="flex btn btn-primary">Add Plan</button>
        </div>
      </div>
    </div>
  </v-modal>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      loading: false,
      interval_list:['Yearly', 'Monthly', 'Weekly', 'Daily', 'Single Payment'],
      form: {
        name: '',
        amount: '',
        interval: '',
        status: ''
      },
    }
  },

  methods: {
    hideModal() {
      this.$emit('hide')
    },
    onSubmit() {
      const {name, amount, interval} = this.form;
      return this.$axios.post(`/plans`, {
          name,
          amount,
          interval
      })
      .then((data)=> {
        console.log(data);
        this.$emit('hide');
      });
    }
  },
}
</script>
