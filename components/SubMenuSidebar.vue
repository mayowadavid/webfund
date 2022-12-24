<template>
  <div class="sidebar hidden lg:flex lg:flex-col">
    <div class="relative lg:sticky top-0">
      <div class="lg:pt-8 mx-6 relative">
        <h3 class="font-bold text-blue-500">{{ title }}</h3>
      </div>
      <div class="menu-scroll">
        <nav class="h-full">
          <ul class="relative h-full mx-6" @click.prevent="toggleNav">
            <li v-for="(menu, index) in options" :key="index" class="nav-item">
              <router-link
                :to="menu.link || '/'"
                class="nav-link"
                active-class="active"
              >
                {{ menu.title }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    userMenu: false,
  }),

  computed: mapGetters({
    user: 'auth/user',
  }),

  methods: {
    toggleNav() {
      // this.$store.commit('app/SET_MENU', !this.menu)
    },
  },
}
</script>

<style scoped>
.sidebar {
  width: 248px;
  min-width: 248px;
  z-index: 1;
  min-height: 100%;
  @apply bg-white border-r border-gray-300;
}

nav {
  padding-top: 17px;
  padding-bottom: 25px;
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
  display: block;
  padding: 10px 15px;
  margin-top: 5px;
  line-height: 22px;
  @apply text-base text-gray-600;
}
.nav-link:hover {
  text-decoration: none;
  @apply text-gray-600;
}
.nav-link.active {
  line-height: 21px;
  @apply font-bold text-blue-500 bg-blue-200 rounded;
}

.menu-scroll {
  height: calc(100vh - 218px);
}

@media (max-width: 768px) {
  .menu-scroll {
    height: 100vh;
    position: relative;
    display: grid;
    overflow-y: scroll;
  }
}
</style>
