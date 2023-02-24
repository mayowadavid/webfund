<template>
<div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title><span class="text-blue-600">Organizations</span></v-nav-title>
          <div class="flex-grow">
            <v-search v-model="search" placeholder="Search organization" />
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mb-3 mt-3" />
        <div class="flex flex-col mt-3">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" class="pr-6">Status</th>
                      <th scope="col" class="px-6">Date</th>
                      <th scope="col" class="px-6">Name</th>
                      <th scope="col" class="px-6">Phone</th>
                      <th scope="col" class="px-6">Category</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(org, index) in allOrg"
                      :key="index"
                      class="cursor-pointer"
                      @click.prevent="handlePageRedirect(org)"
                    >
                      <td class="pr-6">
                        <span
                          class="status capitalize"
                          :class="{
                            success: org.status === 'accepted',
                            warning: org.status === 'pending',
                            danger: org.status === 'rejected',
                          }"
                        >
                          {{ org.status }}
                        </span>
                      </td>
                      <td class="px-6">
                        <div class="text-base text-gray-500">
                          {{ org.createdAt }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ org.name }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ org.phone }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ org.category }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
   middleware: ['auth', 'check-auth'],
  data() {
    return {
      request_modal: false,
      search: '',
      status: '',
      allOrg: [],
      organization_types: [],
    }
  },
  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
      allOrgData: (state) => state.auth.allOrg,
    })},
  watch: {
  allOrgData(newValue, oldValue){
      this.allOrg = [...newValue];
    },
  },
  mounted(){
    // fetch org
    this.$store.dispatch('auth/fetchAllOrganization');
  },
  methods: {
    toggleRequestModal() {
      this.request_modal = !this.request_modal
    },
    handlePageRedirect(d){
      const {
          address,
          category,
          description,
          logo,
          organisation_type,
          phone,
          status,
          updatedAt,
          website,
          id,
        } = d;
        //console.log(d);
      const user = {
        userId: d.user_id,
        org: {
          id,
          address,
          category,
          description,
          logo,
          organisation_type,
          phone,
          status,
          updatedAt,
          website
        }
      }
      this.$store.dispatch('auth/setUserData', user);
    }
  },
}
</script>
