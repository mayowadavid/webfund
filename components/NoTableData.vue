<template>
  <tr class="flex flex-col w-full">
    <td colspan="100%">
      <div class="text-center mx-auto my-12 lg:my-48">
        <svg
          width="24"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-no-shrink mx-auto text-gray-200 mb-1 md:mb-2"
          style="zoom: 4"
        >
          <path
            d="M18.355 17.074a.483.483 0 00.439-.052.472.472 0 00.206-.39V1.474a.472.472 0 00-.645-.442L6.121 5.737H2.895C1.85 5.737 1 6.587 1 7.632v2.842c0 1.045.85 1.895 1.895 1.895h1.01l.89 6.224a.474.474 0 00.468.407h2.842a.47.47 0 00.47-.527L7.97 13.08l10.385 3.994zm-12.68.979l-.813-5.684h1.26l.852.327.6 5.357h-1.9zm12.377-2.111L6.684 11.569V6.537l11.368-4.373v13.778zM1.947 7.632c0-.523.425-.947.948-.947h2.842v4.736H2.895a.948.948 0 01-.948-.947V7.632zm18.08-1.159a.473.473 0 00.656.132l2.842-1.895A.473.473 0 1023 3.922l-2.842 1.895a.473.473 0 00-.132.656zm3.236 8.738a.47.47 0 01-.263-.08l-2.842-1.895a.474.474 0 01.525-.788l2.842 1.895a.474.474 0 01-.262.868zM20.42 10h2.842a.474.474 0 000-.948h-2.841a.474.474 0 000 .947z"
            fill="currentColor"
          />
        </svg>
        <h3 class="text-gray-300 font-semibold">{{ title }}</h3>
        <p v-if="description" class="text-gray-400 text-sm mt-3">
          {{ description }}
        </p>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
  },
}
</script>
