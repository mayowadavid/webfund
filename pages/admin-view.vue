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
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          <v-button
                            class="flex"
                            size="sm"
                            type="button"
                            @click.prevent="downloadFile"
                          >
                            <svg
                              class="text-white mr-3 my-auto"
                              width="25"
                              height="24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0)">
                                <path
                                  d="M5.5 16h14M10.5 19h4"
                                  stroke="currentColor"
                                  stroke-width="1.3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <rect
                                  x="4.5"
                                  y="2"
                                  width="16"
                                  height="20"
                                  rx="2"
                                  stroke="currentColor"
                                  stroke-width="1.3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <circle
                                  cx="12.5"
                                  cy="9"
                                  r="3.35"
                                  stroke="currentColor"
                                  stroke-width="1.3"
                                />
                                <path
                                  d="M20.5 4.35a.65.65 0 100 1.3v-1.3zm0 14a.65.65 0 100 1.3v-1.3zm0-12.7h2v-1.3h-2v1.3zm2.35.35v12h1.3V6h-1.3zm-.35 12.35h-2v1.3h2v-1.3zm.35-.35a.35.35 0 01-.35.35v1.3A1.65 1.65 0 0024.15 18h-1.3zM22.5 5.65a.35.35 0 01.35.35h1.3a1.65 1.65 0 00-1.65-1.65v1.3zM4.114 4.35a.65.65 0 010 1.3v-1.3zm.386 14a.65.65 0 110 1.3v-1.3zm-.386-12.7H2.5v-1.3h1.614v1.3zM2.15 6v12H.85V6h1.3zm.35 12.35h2v1.3h-2v-1.3zM2.15 18c0 .193.157.35.35.35v1.3A1.65 1.65 0 01.85 18h1.3zM2.5 5.65a.35.35 0 00-.35.35H.85c0-.911.739-1.65 1.65-1.65v1.3z"
                                  fill="currentColor"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0">
                                  <path
                                    fill="currentColor"
                                    transform="translate(.5)"
                                    d="M0 0h24v24H0z"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <span class="flex-inline my-auto">Downloadf File</span>
                          </v-button>
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
    },
    downloadFile(){
      // fetch org
    return this.$store.dispatch('auth/downloadDocuments');
    }
  },
}
</script>
