<template>
  <div class="sidebar" :class="menu ? 'open' : 'closed'">
    <span class="overlay" @click="toggleNav"></span>
    <div class="relative lg:sticky top-0">
      <div class="pt-5 lg:pt-8 relative">
        <!-- <button
          variant="light"
          class="menu-close my-auto text-left outline-none focus:outline-none lg:hidden"
          @click="toggleNav"
        >
          <img src="~/static/close.svg" />
        </button> -->
        <div class="px-4 lg:col-span-1 text-center">
          <!-- <router-link :to="{ name: 'student-dashboard' }">
            <img
              src="~/static/logo.svg"
              alt="Ajoo.ng"
              class="ml-2 lg:mx-auto w-7/12 lg:w-auto"
            />
          </router-link> -->
          <div
            class="
              user-menu
              cursor-pointer
              lg:mt-0
              block
              md:inline-block
              relative
              text-left
            "
            @click="toggleUserMenu"
            @keydown.esc.exact="closeUserMenu"
            v-click-outside="closeUserMenu"
          >
            <div class="inline-block text-left text-xs mr-2">
              <span
                class="block text-base text-blue-600 font-bold leading-tight"
              >
                {{org.name}}
              </span>
              <span class="block text-xs font-semibold text-blue-500">
                783992834
              </span>
            </div>
            <div
              class="user-menu-drop shadow-hover relative"
              :class="{ hidden: !userMenu }"
            >
              <div class="px-4 md:px-5 lg:px-6 py-3">
                <nuxt-link
                  to="/settings/profile"
                  class="text-gray-700 block py-2"
                >
                  <span class="text-sm">Settings</span>
                </nuxt-link>
                <a
                  href="#"
                  class="text-gray-700 block py-2"
                  @click.prevent="logout"
                >
                  <span class="text-sm">Sign out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-scroll">
        <nav class="h-full">
          <ul class="relative h-full" @click="toggleNav">
            <li class="nav-item">
              <router-link
                :to="{ name: 'get-started' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.208.028c.954.052 1.712.81 1.764 1.764.105 1.923.002 5.688-1.86 9.287-.948 1.835-2.558 3.776-4.414 5.325l-.04.032-.03.024-.27 3.515a1.855 1.855 0 01-.832 1.414l-3.627 2.398a1.282 1.282 0 01-1.229.103 1.28 1.28 0 01-.75-.979l-.459-2.961-.01.002c-.054.01-.108.02-.162.028a1.87 1.87 0 01-1.622-.523l-4.125-4.124a1.864 1.864 0 01-.522-1.622l.028-.162.002-.01-2.961-.459a1.28 1.28 0 01-.979-.75A1.28 1.28 0 01.214 11.1L2.61 7.474c.32-.484.836-.787 1.414-.831L7.54 6.37l.024-.029.033-.04c1.548-1.856 3.489-3.466 5.324-4.415C16.52.026 20.285-.077 22.208.028zM12.281 22.51l3.469-2.294a.458.458 0 00.206-.349l.176-2.29c-1.382.926-2.832 1.616-4.298 2.047l.447 2.886zm-6.744-8.17l4.124 4.124a.456.456 0 00.396.13c.59-.098 1.298-.267 2.087-.55l-6.188-6.189a12.097 12.097 0 00-.55 2.09.456.456 0 00.13.395zm.886-6.471l-2.29.177a.458.458 0 00-.349.205l-2.293 3.47 2.886.446c.43-1.466 1.121-2.916 2.046-4.298zm7.12 9.584a16.122 16.122 0 003.254-2.128c1.718-1.434 3.2-3.216 4.067-4.89 1.708-3.304 1.8-6.785 1.703-8.565a.461.461 0 00-.435-.436c-1.781-.097-5.262-.005-8.565 1.703-1.675.867-3.457 2.349-4.89 4.067a16.4 16.4 0 00-2.13 3.255l6.995 6.994zm5.383-7.406a3.505 3.505 0 01-2.486 1.028c-.9 0-1.8-.343-2.486-1.028a3.493 3.493 0 01-1.03-2.486c0-.939.366-1.822 1.03-2.486a3.52 3.52 0 014.972 0 3.492 3.492 0 011.03 2.486c0 .94-.366 1.822-1.03 2.486zM16.44 5.452c-.54 0-1.08.205-1.492.617a2.096 2.096 0 00-.617 1.491c0 .564.219 1.093.617 1.492.823.822 2.161.822 2.983 0 .399-.399.618-.928.618-1.492a2.103 2.103 0 00-2.11-2.108z"
                      fill="currentColor"
                    />
                  </svg>
                </i>
                <span class="my-auto">Get Started</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'index' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="dashboardIcon"></i>
                <span class="my-auto">Dashboard</span>
              </router-link>
            </li>
            <li v-if="user?.role == 'admin'" class="nav-item">
              <router-link
                :to="{ name: 'donations' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="donationsIcon"></i>
                <span class="my-auto">Donations</span>
              </router-link>
            </li>
            <li v-if="user?.role == 'admin'" class="nav-item">
              <router-link
                :to="{ name: 'donors' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="donorsIcon"></i>
                <span class="my-auto">Donors</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'payouts' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="payoutsIcon"></i>
                <span class="my-auto">Payouts</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'disputes' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="disputesIcon"></i>
                <span class="my-auto">Disputes</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'plans' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="plansIcon"></i>
                <span class="my-auto">Plans</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'audit-logs' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="auditLogsIcon"></i>
                <span class="my-auto">Audit Logs</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'campaigns' }"
                class="nav-link"
                active-class="active"
                exact
              >
                <i class="flex mr-3 my-auto" v-html="campaignsIcon"></i>
                <span class="my-auto">Campaigns</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'settings' }"
                class="nav-link"
                active-class="active"
              >
                <i class="flex mr-3 my-auto" v-html="settingsIcon"></i>
                <span class="my-auto">Settings</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="nav-item pt-md-4 mt-5 mb-6 w-full">
        <hr class="sidebar-divider mx-8 mb-4" />
        <ul class="relative" @click="toggleNav">
          <li class="nav-item">
            <router-link
              :to="{ name: 'settings-profile' }"
              class="nav-link"
              active-class="active"
              exact
            >
              <i class="flex mr-3 my-auto" v-html="profileIcon"></i>
              <span class="my-auto">Profile</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">
              <i class="flex mr-3 my-auto" v-html="logoutIcon"></i>
              <span class="my-auto">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex';
export default {
  data: () => ({
    userMenu: false,
    appName: process.env.appName,
    org: {},
    // Import menu SVGs
    dashboardIcon: require('@/static/icon/dashboard/dashboard.svg?raw'),
    donationsIcon: require('@/static/icon/dashboard/donations.svg?raw'),
    donorsIcon: require('@/static/icon/dashboard/donors.svg?raw'),
    payoutsIcon: require('@/static/icon/dashboard/payouts.svg?raw'),
    disputesIcon: require('@/static/icon/dashboard/disputes.svg?raw'),
    plansIcon: require('@/static/icon/dashboard/plans.svg?raw'),
    auditLogsIcon: require('@/static/icon/dashboard/audit-logs.svg?raw'),
    campaignsIcon: require('@/static/icon/dashboard/campaigns.svg?raw'),
    settingsIcon: require('@/static/icon/dashboard/settings.svg?raw'),
    profileIcon: require('@/static/icon/dashboard/profile.svg?raw'),
    logoutIcon: require('@/static/icon/dashboard/logout.svg?raw'),
  }),

  computed: {
      ...mapState({
      orgData: (state) => state.auth.org,
    }),
   ...mapGetters({
    menu: 'app/menu',
    user: 'auth/user',
  })
  },
  watch: {
    orgData(newValue, oldValue){
      this.org = newValue;
    }
  },
  mounted() {
    // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)

    // fetch org
    this.$store.dispatch('auth/fetchOrganization');
  },

  methods: {
    toggleNav() {
      this.$store.commit('app/SET_MENU', !this.menu)
    },
    toggleUserMenu(e) {
      if (e) e.preventDefault()
      this.userMenu = !this.userMenu
    },
    closeUserMenu() {
      this.userMenu = false
    },
    async logout() {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-width: 260px;
  z-index: 2001;
  min-height: 100%;
  @apply bg-blue-100;
}

.sidebar .overlay {
  display: none;
  position: absolute;
  left: 260px;
  top: 0;
  width: 1000px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

nav {
  padding-top: 27px;
  padding-bottom: 35px;
}

ul {
  /* padding: 0; */
}

li {
  list-style: none;
  margin: 0;
}

ul.btn-gray-share > li {
  padding: 10px;
  margin-right: 10px;
}

.nav-link {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  padding: 10px 15px 10px 24px;
  margin-top: 5px;
  background-repeat: no-repeat;
  background-position: left 25px top 50%;
  @apply text-base text-gray-500;
}
.nav-link:hover {
  text-decoration: none;
  @apply text-gray-500;
}
.nav-link.active {
  @apply font-bold text-blue-500;
}

.menu-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent !important;
  border: 0 !important;
}

.menu-scroll {
  height: calc(100vh - 218px);
}

.user-menu {
  background-image: url('/icon/dash-user-arrow.svg');
  background-repeat: no-repeat;
  background-position: top 17px right 17px;
  padding: 3px;
  @apply bg-blue-200 rounded pl-4 pr-12 py-3;
  @apply align-bottom;
}
.user-menu-drop {
  z-index: 5;
  top: 52px;
  min-width: 220px;
  @apply absolute w-full right-0;
  @apply bg-white rounded-md border border-gray-300;
}

@media (max-width: 768px) {
  .menu-scroll {
    height: calc(100vh - 208px);
    position: relative;
    display: grid;
    overflow-y: scroll;
  }
}

@media (max-width: 1124px) {
  .App-logo {
    width: 98px;
  }
  nav {
    padding-top: 25px;
  }
  .mb-logo-top {
    padding: 8px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .sidebar.closed {
    position: absolute;
    left: -265px;
  }
  .sidebar.open {
    position: fixed;
    left: 0;
    height: 100%;
    min-height: 100vh;
    transition: 0.28s;
  }
  .sidebar.open .overlay {
    display: block;
    transition: 0.32s;
  }
}
</style>
