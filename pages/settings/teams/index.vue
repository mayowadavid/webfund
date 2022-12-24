<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <dash-settings-navbar-mobile />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title>Teams</v-nav-title>
        <div class="flex flex-col md:flex-row gap-y-4 mt-5">
          <div class="flex-grow">
            <v-search v-model="search" placeholder="Search Members" />
          </div>
          <v-button
            size="sm"
            type="button"
            @click.prevent="$router.push('/settings/teams/invite')"
          >
            Invite Member
          </v-button>
        </div>
        <div class="flex flex-col mt-4 md:mt-3">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden">
                <div
                  class="flex flex-col"
                  v-if="members && members && members.length"
                >
                  <div class="flex flex-col" v-if="$device.isMobile">
                    <div
                      v-for="(member, index) in members"
                      :key="index"
                      @click.prevent="
                        $router.push('/settings/teams/' + member.id)
                      "
                      class="flex flex-row border-t border-gray-300 pt-4 pb-3"
                    >
                      <div class="flex flex-col flex-auto gap-y-1">
                        <div class="text-sm font-medium text-gray-900">
                          {{ member.first_name + ' ' + member.last_name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ member.email }}
                        </div>
                        <div class="text-sm font-medium text-gray-900">
                          Last Seen
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ member.last_seen || 'N/A' }}
                        </div>
                      </div>
                      <div class="text-base text-gray-500">
                        <span class="tag pill mr-auto">{{ member.role }}</span>
                      </div>
                    </div>
                  </div>
                  <table v-else>
                    <thead>
                      <tr>
                        <th scope="col" class="pr-6">Last seen</th>
                        <th scope="col" class="px-6">Member</th>
                        <th scope="col" class="px-6">Email address</th>
                        <th scope="col" class="px-6">Role</th>
                        <!-- <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th> -->
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="(member, index) in members"
                        :key="index"
                        class="cursor-pointer"
                        @click.prevent="
                          $router.push('/settings/teams/' + member.id)
                        "
                      >
                        <td class="pr-6">
                          <div class="text-base text-gray-500">
                            {{ member.last_seen || 'N/A' }}
                          </div>
                        </td>
                        <td class="px-6">
                          <div class="text-base font-medium text-gray-900">
                            {{ member.first_name + ' ' + member.last_name }}
                          </div>
                        </td>
                        <td class="px-6">
                          <div class="text-base text-gray-500">
                            {{ member.email }}
                          </div>
                        </td>
                        <td class="px-6 text-base text-gray-500">
                          <span class="tag pill">{{ member.role }}</span>
                        </td>
                        <!-- <td
                          class="px-6 text-right text-base font-medium"
                        >
                          <a href="#" class="text-indigo-600 hover:text-indigo-900"
                            >Edit</a
                          >
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
                <no-table-data
                  v-else
                  title="Add a Team Member"
                  description="Please add a new team member to start seeing data here"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data() {
    return {
      search: '',
      members: [],
    }
  },
  mounted() {
    // fetch org
    const id = JSON.parse(localStorage.getItem('id'));
    console.log(id);
    this.$axios.get(`/organisations/${id}/teams`)
    .then(({data})=> {
      console.log(data.data.teams);
      this.members = data.data.teams.map((memb)=> {
        const {fullname, email, role, updatedAt, id} = memb;
        const splits = fullname.split(" ");
        const first_name = splits[0];
        const last_name = splits[1];
        const last_seen = updatedAt;
        return {first_name, last_name, email, role, id, last_seen};
      });
    });
  },
}
</script>
