<template>
  <div>
    <div class="w-full bg-[#F7F7F8]">
      <div class="container px-4 sm:px-5 lg:px-10 mx-auto py-8 md:py-12">
        <div class="flex flex-wrap justify-between items-start mb-10">
          <div
            v-for="(item, index) in menu_items_1"
            class="md:w-1/5 w-1/2 md:mb-0 mb-3"
            :key="index"
          >
            <h4 class="tetx-lg font-bold text-[#575B68] mb-2">
              {{ item.title }}
            </h4>
            <div class="flex flex-col space-y-3">
              <a
                v-for="(item_link, i) in item.links"
                :key="i"
                :href="item.link"
                class="text-[#9598A3]"
                >{{ item_link.menu }}</a
              >
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-start items-start mb-5">
          <div
            v-for="(item, index) in menu_items_2"
            class="md:w-1/5 w-1/2 md:mb-0 mb-3"
            :key="index"
          >
            <h4 class="tetx-lg font-bold text-[#575B68] mb-2">
              {{ item.title }}
            </h4>
            <div class="flex flex-col space-y-3">
              <a
                v-for="(item_link, i) in item.links"
                :key="i"
                :href="item.link"
                class="text-[#9598A3]"
                >{{ item_link.menu }}</a
              >
            </div>
          </div>
          <div
            class="md:w-1/5 w-1/2 md:mb-0 mb-3"
          >
            <h4 class="tetx-lg font-bold text-[#575B68] mb-2">
              {{ contact_items.title }}
            </h4>
            <div class="flex flex-col space-y-3">
              <a
                v-for="(item, i) in contact_items.items"
                :key="i"
                :href="item.link"
                v-bind:class="[ i === 0 ? 'text-blue-500':'text-[#9598A3]']"
                >{{ item.menu }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-white">
      <div class="container px-4 sm:px-5 lg:px-10 mx-auto">
        <div class="flex flex-wrap items-center justify-between h-[100px] py-5">
          <p class="font-bold text-lg text-[#2B384C]">Wefundx. © 2020</p>

          <div class="flex md:space-x-6 space-x-3">
            <a href="#" class="md:text-base text-sm text-[#767E85]">twitter</a>
            <a href="#" class="md:text-base text-sm text-[#767E85]">Instagam</a>
            <a href="#" class="md:text-base text-sm text-[#767E85]">Facebook</a>
            <a href="#" class="md:text-base text-sm text-[#767E85]">Linkedin</a>
            <a href="#" class="md:text-base text-sm text-[#767E85]">Youtube</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require('@/static/logo.svg'),
      show: false,
      menu_items_1: [
        {
          title: 'Our Solution',
          links: [
            { menu: 'NGOs', link: '#' },
            { menu: 'Churches & Mosques', link: '#' },
            { menu: 'Political Organization', link: '#' },
            { menu: 'Government Agencies', link: '#' },
            { menu: 'Student Bodies', link: '#' },
            { menu: 'Private Organization', link: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { menu: 'Our Stories', link: '#' },
            { menu: 'Our Value', link: '#' },
            { menu: 'Our Mission', link: '#' },
            { menu: 'Our Vision', link: '#' },
            { menu: 'Our Team', link: '#' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { menu: 'Terms & Condition', link: '#' },
            { menu: 'Privacy Policy', link: '#' },
            { menu: 'Cookies Policy', link: '#' },
            { menu: 'Wefundx usage Agreement', link: '#' },
            { menu: 'Donation Protection Guarantee', link: '#' },
          ],
        },
        {
          title: 'Pricing',
          links: [
            { menu: 'Processing fee for donors', link: '#' },
            { menu: 'Processing fee for organization', link: '#' },
          ],
        },
        {
          title: 'Support',
          links: [
            { menu: 'Help desk', link: '#' },
            { menu: 'Contact Us', link: '#' },
          ],
        },
      ],
      menu_items_2: [
        {
          title: 'Developers',
          links: [
            { menu: 'Overview', link: '#' },
            { menu: 'Documentation', link: '#' },
          ],
        },
        {
          title: 'Learn',
          links: [
            { menu: 'Tutorial Videos', link: '#' },
            { menu: 'Sitemap', link: '#' },
          ],
        },
      ],
      contact_items: {
        title: 'Contact',
        items: [
          { menu: 'admin@wefundx.com', link: '#' },
          { menu: '31 Bishop Street, Ojuelegba, Surulere, Lagos', link: '#' },
        ],
      },
    }
  },
}
</script>