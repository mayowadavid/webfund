<template>
  <div
    v-if="$device.isMobile"
    class="navbar-mobile container bg-white sticky top-0 px-5 py-4"
    :class="{ 'shadow shadow-gray-100': !hideShadow }"
  >
    <nav class="flex flex-col">
      <div class="flex flex-row items-center">
        <v-back-button v-if="showBackButton" @go-back="$router.go(-1)" />
        <button v-else class="flex items-center h-7" @click.prevent="openMenu">
          <svg
            width="22"
            height="15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 1.05C0 .47.396 0 .885 0h20.23c.489 0 .885.47.885 1.05 0 .58-.396 1.05-.885 1.05H.885C.396 2.1 0 1.63 0 1.05zm0 6.1C0 6.57.396 6.1.885 6.1h20.23c.489 0 .885.47.885 1.05 0 .58-.396 1.05-.885 1.05H.885C.396 8.2 0 7.73 0 7.15zm.885 5.05c-.489 0-.885.47-.885 1.05 0 .58.396 1.05.885 1.05h20.23c.489 0 .885-.47.885-1.05 0-.58-.396-1.05-.885-1.05H.885z"
              fill="#006696"
            />
          </svg>
        </button>
        <h5
          class="font-medium text-blue-600 text-lg text-center mx-auto my-auto"
        >
          {{ title }}
        </h5>
        <div class="w-5">
          <notifications v-if="!hideNotification" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    hideShadow: {
      type: Boolean,
      default: false,
    },

    hideNotification: {
      type: Boolean,
      default: false,
    },

    showBackButton: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    open: false,
    userMenu: false,
  }),
  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
    }),
  },
  methods: {
    openMenu() {
      this.$store.commit('app/SET_MENU', true)
    },
  },
}
</script>

<style scoped>
.navbar-mobile {
  z-index: 1;
}

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
  width: 36px;
  height: 36px;
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
.user-avatar {
  border-radius: 7.5px;
  background-color: #e9e9e9;
  display: inline-block;
  width: 36px;
  height: 36px;
  vertical-align: bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

.user-menu-drop {
  z-index: 5;
  top: 45px;
  min-width: 185px;
  @apply absolute w-full right-0;
  @apply bg-white rounded-xl border border-gray-300;
}

@media (min-width: 768px) {
  .menu-group {
    @apply flex items-center w-auto shadow-none;
    @apply bg-transparent px-0 mt-0;
  }
}
@media (max-width: 768px) {
  .notification {
    background-size: 15px;
  }
  .notification > span {
    border-radius: 6px;
    font-size: 8px;
    top: 6px;
    right: 6px;
  }
}
</style>
