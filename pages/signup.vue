<template>
  <div class="grid grid-cols-12 md:gap-8 lg:gap-16 h-full">
    <div
      class="
        col-span-12
        md:col-span-4
        lg:col-span-5
        md:order-last
        mt-8
        md:my-auto
      "
    >
      <div class="flex">
        <progress-circle-step
          show-steps
          :step="activeTab + 1"
          :steps="steps"
          class="mx-auto"
        />
      </div>
    </div>
    <div class="col-span-12 md:col-span-8 lg:col-span-7 my-auto">

        <!-- Form Header -->

        <template>
          <h1
            class="
              text-center
              md:text-left
              text-gray-800
              font-bold
              leading-none
              mb-6
            "
          >
            {{ titles[activeTab] }}
          </h1>
          <p class="text-center md:text-left text-gray-600 mb-8 md:pr-20">
            {{ sub_titles[activeTab] }}
          </p>
        </template>

        <!-- Form Section 1 -->

        <!-- All Footers -->

        <FirstForm @nextTab="nextTab" v-if="activeTab === 0"/>

        <!-- Form Section 2 -->

        <SecondForm @nextTab="nextTab" @backTab="backTab" v-if="activeTab === 1"/>

        <!-- Form Section 3 -->

        <ThirdForm @backTab="backTab" v-if="activeTab === 2"/>

    </div>
  </div>
</template>

<script>
import FirstForm from '../components/registrationForms/FirstForm';
import SecondForm from '../components/registrationForms/SecondForm';
import ThirdForm from '../components/registrationForms/ThirdForm';

export default {
  layout: 'auth',
  middleware: 'guest',
  scrollToTop: true,
  components: {FirstForm, SecondForm, ThirdForm},
  data: () => ({
    loading: false,
    form: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          re_password: '',
          phone_number: '',
      },
    done: [],
    activeTab: 1,
    countries: [],
    organization_categories: [],
    organization_types: [],
    all_states: [],
    cities: [],
    transaction_volumes: [],
    steps: [
      'Personal Information',
      'Organization Details',
      'Organization Address',
    ],
    titles: [
      'Get started',
      'Tell us more about the organization',
      'Add organization address',
    ],
    sub_titles: [
      `Whether you're just starting out or ready to grow your nonprofit's
      fundraising, we've got it covered.`,
      'We will help you get started based on your feedback.',
      `This will be used as your default business address. You can
      always change this later.`,
    ],
  }),
  updated() {
      const activeTab = this.$store.getters['app/activeTab'];
      this.activeTab = activeTab;
      console.log(activeTab, '109');
  },
  methods: {
    nextTab(){
      this.activeTab += 1;
    },
    backTab(){
      this.activeTab -= 1;
    }
  },
}
</script>
