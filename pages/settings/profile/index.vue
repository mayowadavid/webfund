<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <dash-settings-navbar-mobile />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title>Profile</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-6 md:mt-10">
          <client-only>
            <div v-if="user" class="col-span-12 md:col-span-10 lg:col-span-7">
              <div class="flex flex-col md:flex-row items-center gap-5">
                <div class="firstname w-full md:w-2/5 mr-auto">
                  <p class="profile-label text-base text-gray-400 leading-6">
                    Full Name
                  </p>
                  <p class="text-base text-gray-900 leading-6 font-semibold">
                    {{ user.fullname }}
                  </p>
                </div>

                <div class="email w-full md:w-2/5">
                  <p class="profile-label text-base text-gray-400 leading-6">
                    Email Address
                  </p>
                  <p class="text-base text-gray-900 leading-6 font-semibold">
                    {{ user.email }}
                  </p>
                </div>
              </div>
              <div
                class="
                  flex flex-col
                  md:flex-row
                  items-center
                  gap-5
                  mt-5
                  md:mt-10
                "
              >
                <div class="phone w-full md:w-2/5 mr-auto">
                  <p class="profile-label text-base text-gray-400 leading-6">
                    Phone Number
                  </p>
                  <p class="text-base text-gray-900 leading-6 font-semibold">
                    {{ user?.organisation?.phone }}
                  </p>
                </div>

                <div class="role w-full md:w-2/5">
                  <p class="profile-label text-base text-gray-400 leading-6">
                    Role
                  </p>
                  <p class="text-base text-gray-900 leading-6 font-semibold">
                    {{ user?.role }}
                  </p>
                </div>
              </div>
              <v-button
                class="mt-12"
                outline
                size="sm"
                type="button"
                @click.prevent="$router.push('/settings/profile/edit')"
              >
                Edit Profile
              </v-button>
            </div>
          </client-only>
        </div>

        <hr class="w-full mt-8" />
        <div class="grid grid-cols-12 mt-10">
          <div class="col-span-12 md:col-span-10 lg:col-span-7">
            <p class="text-base text-black leading-6 font-semibold">Password</p>
            <p
              class="text-sm text-gray-400 max-w-sm leading-6 font-normal mt-4"
            >
              Make your password stronger with more than 8 (eight) characters by
              including upper and lower case, one capital letter, one number,
              one special character like !”%$&
            </p>
            <v-button
              class="mt-8"
              outline
              size="sm"
              type="button"
              @click.prevent="$router.push('/settings/profile/change-password')"
            >
              Change Password
            </v-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    user: {
      fullname: '',
      email: '',
      role: '',
    },
  }),
  mounted(){
    let userData = this.$store.getters['auth/user'];
    this.user = userData
   // fetch org
    this.$store.dispatch('auth/fetchOrganization');
  },
}
</script>
