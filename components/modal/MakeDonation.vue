<template>
<v-modal
    :show="show"
    title="Make donation"
    backdrop="static"
    @hide="hideModal"
  >
    <v-form
                  id="donation-form"
                  ref="form"
                  :loading.sync="loading"
                  :on-submit="onSubmit"
                  :on-success="onSuccess"
                  success-message="Donation created successfullly"
                >
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="donation"
                        rules="required"
                      >
                        <input
                          id="input-donation"
                          v-model="form.donation"
                          class="form-input"
                          :class="classes"
                          placeholder="₦ Enter your donation"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="mb-5">
                    <span class="text-blue-600">Platform fee:</span>
                    <span class="form-input text-blue-600">{{
                      form.donation && !isNaN(form.donation)
                        ? (5 / 100) * parseFloat(form.donation.toString().replace(/[^\d.-]/g, '')) : 0
                    }}</span>
                  </div>
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="first_name"
                        rules="required"
                      >
                        <input
                          id="input-first_name"
                          v-model="form.first_name"
                          class="form-input"
                          :class="classes"
                          placeholder="First name"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="last_name"
                        rules="required"
                      >
                        <input
                          id="input-last_name"
                          v-model="form.last_name"
                          class="form-input"
                          :class="classes"
                          placeholder="Last name"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="address"
                        rules="required"
                      >
                        <input
                          id="input-address"
                          v-model="form.email"
                          class="form-input"
                          :class="classes"
                          placeholder="Email address"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                      <label for="input-description">Comments</label>
                        <textarea
                          id="input-description"
                          v-model="form.comment"
                          class="form-input"
                          placeholder="Comment"
                        >
                        </textarea>
                  </div>
                  <div class="form-group mb-5">
                    <div>
                        <v-checkbox
                          v-model="form.hide_public"
                          name="ussd"
                          value="ussd"
                        >
                          Hide my information from the public
                        </v-checkbox>
                    </div>
                  </div>
                  <template v-slot:footer>
                    <div class="flex flex-row mt-5">
                      <v-button
                        :loading="loading"
                        block
                        class="mb-6"
                      >
                        Pay Now
                      </v-button>
                    </div>
                  </template>
    </v-form>
  </v-modal>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    campaign_id: String
  },
  data() {
    return {
          loading: false,
          form: {
              donation: '',
              first_name: '',
              last_name: '',
              email: '',
              comment: ''
            },
    }
  },
   mounted(){
    //load
     let paystack = document.createElement('script')
      paystack.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
      document.head.appendChild(paystack)
  },
  methods: {
    hideModal() {
      this.$emit('hide')
    },
    onSubmit(){
      this.loading = true
       let {
        donation,
       first_name,
        last_name,
        email,
        comment
      } = this.form;

      //donation rounded figure
      donation = parseFloat(donation.toString().replace(/[^\d.-]/g, '')) * 100 || 0;
      console.log(donation);
      // fee calculation
      let fees = donation && !isNaN(donation) ? (5 / 100) * donation : 0;
      console.log(fees)
      //fetch campaign id
      const campaign_id = this.campaign_id;
      //check for signed in user
      const donor_anonymous = this?.user?.first_name !== undefined ? false : true;
      //donation details
      const form = {
                  amount: donation + fees,
                  donor_name: first_name + ' ' + last_name,
                  donor_email: email,
                  donor_anonymous,
                  campaign_id,
                  comment
        }
      // reset form
      const resetForm = () => {
        this.$emit('hide')
        this.loading = false
      }

      //make donations
      const createDonations = ()=>{
          return this.$store.dispatch('auth/createDonation', form)
      }

      //verify donations
      const verifyDonation = async(ref)=>{
          return this.$store.dispatch('auth/verifyDonation', ref)
      }
      // paystack connection
      const makePayment = (ref, key) =>{
          // paystack
              let handler = PaystackPop.setup({
                key, // Replace with your public key
                email,
                amount: donation + fees,
                ref,
                // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                // label: "Optional string that replaces customer email"
                onClose: function(){
                  alert('Window closed.');
                },
                callback: function(response){
                  resetForm();
                  //verify dovation
                  verifyDonation(response.reference);
                }
              });

              // open frame
              handler.openIframe();
      }

      //create donation and attached reference to it
      return createDonations().then(({data})=>{
        const { donation } = data.data;
        let key = this.$config.testkey;
             makePayment(donation.reference, key);
          });
    },
    onSuccess(resp) {
      //console.log(resp);
     },
  },
}
</script>
