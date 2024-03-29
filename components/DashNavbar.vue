<template>
  <div class="w-full mx-auto">
    <nav class="flex items-center justify-between flex-wrap py-4 md:py-6">
      <h5
        class="
          flex
          items-center
          flex-shrink-0
          mr-6
          ml-4
          lg:ml-0
          font-extrabold
          text-gray-700
        "
      >
        {{ title }}
      </h5>
      <div :class="{ hidden: !open }" class="menu-group">
        <div class="ml-auto mr-24" @click="toggleMenu">
          <NavSearchBox />
        </div>
        <div
          class="mt-8 md:mt-0 mb-6 md:mb-0 lg:border-l border-gray-400 lg:pl-6"
        >
          <div class="notification mr-3">
            <span>{{ 0 }}</span>
          </div>
          <a
            href="#"
            class="user-menu lg:mt-0 block md:inline-block relative"
            @click="toggleUserMenu"
          >
            <span
              class="user-avatar mr-1"
              :style="{ backgroundImage: 'url(/avatar.jpg)' }"
            ></span>
            <div class="inline-block text-left text-xs mr-2 pt-1">
              <span class="block text-gray-700 font-bold leading-tight">
                {{userData.fullname}}
              </span>
              <span class="block text-gray-600">{{userData.email}}</span>
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
                  <span class="text-sm">Account</span>
                </nuxt-link>
                <nuxt-link
                  to="/settings/profile"
                  class="text-gray-700 block py-2"
                >
                  <span class="text-sm">Settings</span>
                </nuxt-link>
                <nuxt-link to="/" class="text-gray-700 block py-2">
                  <span @click="handleSignOut" class="text-sm">Sign out</span>
                </nuxt-link>
              </div>
            </div>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    open: false,
    userMenu: false,
  }),
  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
      userData: (state) => state.auth.user,
    }),
  },
  methods: {
    toggleMenu() {
      this.open = !this.open
    },
    toggleLogin(e) {
      if (e) e.preventDefault()
      this.open = false
      this.$store.commit('app/LOGIN_MODAL', 'login')
    },
    toggleUserMenu(e) {
      if (e) e.preventDefault()
      this.userMenu = !this.userMenu
    },
    handleSignOut(){
      this.$store.dispatch('auth/logout');
    }
  },
}
</script>

<style scoped>
.menu-group {
  @apply transition duration-500;
  @apply w-full flex-grow bg-white mt-5 shadow-lg px-4;
}
.menu-item {
  @apply text-sm text-black mr-8;
}
.menu-item:hover {
  @apply text-orange-500;
}
.menu-item.has-child {
  background-image: url('/actions/arrow-down.svg');
  background-repeat: no-repeat;
  background-position: right 0 top 8px;
  padding-right: 24px;
}
.notification {
  position: relative;
  display: inline-block;
  background-color: rgba(249, 158, 66, 0.2);
  border-radius: 12px;
  background-image: url('/icon/notice-bell.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
.notification > span {
  display: inline-block;
  padding: 0 3px;
  position: absolute;
  background-color: rgb(255, 51, 95);
  border-radius: 7.5px;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  top: 8px;
  right: 8px;
}
.user-menu {
  background-image: url('/icon/dash-user-drop.svg');
  background-repeat: no-repeat;
  background-position: top 50% right 17px;
  padding: 3px;
  @apply border border-gray-400 rounded-xl pr-12;
  @apply align-bottom;
}
.user-menu-drop {
  z-index: 5;
  top: 52px;
  min-width: 220px;
  @apply absolute w-full right-0;
  @apply bg-white rounded-xl border border-gray-300;
}
.user-avatar {
  border-radius: 7.5px;
  background-color: #e9e9e9;
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}
@media (min-width: 768px) {
  .menu-group {
    @apply flex items-center w-auto shadow-none;
    @apply bg-transparent px-0 mt-0;
  }
}
</style>
