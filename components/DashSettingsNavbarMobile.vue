<template>
  <div
    v-click-outside="closeDropdown"
    class="settings-navbar relative sticky top-0"
    v-if="$device.isMobile"
  >
    <button
      id="pat_dropdown"
      type="button"
      aria-haspopup="listbox"
      aria-labelledby="pat_dropdown_value pat_dropdown_text"
      @click="toggleDropdown"
      @keydown.esc="closeDropdown"
      class="
        flex
        bg-blue-200
        w-full
        border-b border-blue-500
        shadow-inner
        items-center
        px-5
        py-4
      "
    >
      <div class="flex mr-auto">
        <div class="flex flex-col">
          <span id="pat_dropdown_text" class="text-blue-500 font-semibold">
            {{ selected.title }}
          </span>
        </div>
      </div>
      <div class="transform duration-500" :class="{ 'rotate-90': isActive }">
        <svg
          width="10"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.13 8.44L1.74 15.826a.616.616 0 01-.87-.87l6.953-6.953L.87 1.05a.616.616 0 01.87-.87L9.13 7.567c.24.24.24.63 0 .871z"
            fill="#0396C2"
          />
        </svg>
      </div>
    </button>

    <!-- Start Dropdown Menu -->
    <transition name="fade-up">
      <div
        v-show="isActive"
        class="absolute top-0 left-0 w-full shadow-md z-10"
        style="margin-top: 57px"
      >
        <ul role="listbox">
          <li
            v-for="(menu, index) in menuItems"
            :key="index"
            role="option"
            class="bg-white px-5 py-4 border-b border-gray-200"
            :class="{ hidden: $route.path.includes(menu.link) }"
            tabindex="1"
            :aria-label="menu.title"
            @click="() => handleSelect(menu)"
          >
            <span class="text-gray-500">{{ menu.title }}</span>
          </li>
        </ul>
      </div>
    </transition>
    <!-- End Dropdown Menu -->
  </div>
</template>

<script>
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
    isActive: false,
    menuItems: require('~/static/json/settings-menu.json'),
  }),

  computed: {
    selected() {
      return this.menuItems.find((o) => o.link.includes(this.$route.path))
    },
  },

  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive
    },
    handleSelect(menu) {
      this.$router.push(menu.link)
      this.closeDropdown
    },
    closeDropdown() {
      this.isActive = false
    },
  },
}
</script>

<style scoped>
.settings-navbar {
  z-index: 1;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 500ms;
}

.fade-up-enter,
.fade-up-leave-active {
  transform: translateY(10px);
  opacity: 0;
}

.fade-up-leave {
  transform: translateY(0);
  opacity: 1;
}
</style>
