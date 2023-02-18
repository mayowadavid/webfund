<template>
  <div class="flex bg-gray-100 px-4">
    <div class="container mx-auto">
      <div class="campaign_preview flex_row mb10 mt-10">
        <div class="mb6 m10 sm10">
          <h1 class="font-bold">{{campaign.title}}</h1>
          <div class="flex flex-row divide-x divide-gray-300 my-5">
            <p class="text-gray-500 pr-4">{{campaign.created_day}}</p>
            <p class="flex flex-row text-gray-500 pl-4">
              <svg
                class="my-auto mr-3"
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.696 3.01a2.686 2.686 0 102.686 2.685A2.68 2.68 0 005.696 3.01zm0 4.42A1.736 1.736 0 013.96 5.695c0-.956.778-1.734 1.735-1.734a1.733 1.733 0 110 3.469z"
                  fill="#9598A3"
                />
                <path
                  d="M11.46 1.397a2.542 2.542 0 00-1.907-.83L4.523.516c-1.073 0-2.1.389-2.835 1.171C.904 2.423.516 3.45.516 4.524l.046 5.035c.047.684.296 1.369.83 1.908l12.024 12.018 10.068-10.068-12.023-12.02zm1.909 20.719l-11.34-11.34a1.777 1.777 0 01-.538-1.27l-.047-4.983c0-.782.342-1.565.881-2.151a3.11 3.11 0 012.198-.928l4.983.047c.488 0 .928.196 1.27.539l11.34 11.339-8.747 8.747z"
                  fill="#9598A3"
                />
              </svg>
              <span class="my-auto">{{campaign?.campaign_type}}</span>
            </p>
          </div>
          <div class="flex flex-col">
            <img :src="campaign.images !== undefined ? campaign?.images[indexImage].url : ''" class="w-full h-auto mb-4" />
            <div class="grid grid-cols-4 gap-2 max-w-max">
              <img v-for="(img, index) in campaign.images"
              :key="index"
                :src="img.url"
                alt=""
                @click="handleImageIndex(index)"
                class="
                  w-20
                  h-14
                  border-4 border-blue-500
                  rounded
                  cursor-pointer
                "
              />
            </div>
          </div>
          <div class="flex flex-row py-6">
            <img
              class="w-12 h-12 inline-flex rounded-full my-auto"
              :src="campaign?.organisation?.logo"
            />
            <div class="flex flex-col flex-grow ml-4">
              <h4 class="text-2xl font-bold">{{campaign.organisation?.name}}</h4>
              <p class="text-gray-400">{{campaign.organisation?.category}}</p>
            </div>
          </div>
          <div
            class="
              grid grid-cols-1
              gap-y-6
              text-gray-600
              border-t border-gray-300
              pt-6
            "
          >
            {{campaign?.description}}
          </div>
        </div>
        <div class="mb35 m10 sm10">
          <v-card shadow>
            <!-- Donation start screen -->
            <div v-if="stage === 'start'" class="flex flex-col">
              <div class="flex flex-auto mb-4">
                <h4 class="text-2xl font-bold my-auto">₦{{campaign.total_donated}}</h4>
                <p class="flex flex-row text-gray-700 ml-auto my-auto">
                  <svg
                    class="my-auto mr-2"
                    width="16"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.341 3.126A7.946 7.946 0 009.037.069a7.946 7.946 0 00-5.862 1.552l-.61-.61c-.173-.175-.334-.116-.356.128l-.2 2.185a.36.36 0 00.405.405l2.184-.197c.245-.022.304-.183.13-.357l-.632-.633A6.664 6.664 0 018.87 1.345a6.668 6.668 0 014.452 2.565 6.668 6.668 0 011.333 4.961 6.671 6.671 0 01-2.565 4.451 6.668 6.668 0 01-4.962 1.334 6.669 6.669 0 01-4.45-2.565 6.68 6.68 0 01-1.349-4.839.643.643 0 10-1.278-.143 7.958 7.958 0 001.606 5.765 7.946 7.946 0 005.305 3.057 7.948 7.948 0 005.912-1.589 7.945 7.945 0 003.057-5.304 7.947 7.947 0 00-1.59-5.912z"
                      fill="#575B68"
                    />
                    <path
                      d="M7.685 2.793a.52.52 0 00-.52.521v5.19l4.745 2.452a.52.52 0 10.478-.925L8.206 7.87V3.314a.52.52 0 00-.521-.52z"
                      fill="#575B68"
                    />
                  </svg>
                  <span class="flex my-auto">{{campaign.lapsed}}</span>
                </p>
              </div>
              <div class="my-4 w-full">
                 <progress-bar
                      bar-color="#26B872"
                      :val="campaign.percentage"
                      size="12"
                    ></progress-bar>
              </div>
              <p class="text-gray-600 my-4">{{campaign.campaign_target}} target goal</p>
              <v-button :loading="loading" @click.prevent="gotoStage('info')">
                Donate Now
              </v-button>
              <div class="flex flex-row py-4">
                <div class="flex-inline w-10 h-10 bg-blue-200 p-2 rounded-full">
                  <svg
                    class="text-blue-500 mx-auto"
                    width="24"
                    height="22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.345 12.3l3.293.711A2.983 2.983 0 0124 15.95v1.8a.75.75 0 01-.75.75H18.6a.75.75 0 010-1.5h3.9v-1.05c0-.715-.485-1.321-1.179-1.471l-3.884-.84a.75.75 0 01-.592-.734v-1.83c0-.2.08-.39.22-.531.096-.102.311-.53.438-.786l.008-.016c.23-.457.427-.85.666-1.088.377-.364.768-.795.876-1.281.065-.318.023-.4-.038-.522l-.003-.005v-.002a1.284 1.284 0 01-.172-.614c0-.599 0-1.6-.178-2.2a.76.76 0 01-.032-.202c-.013-.857-.163-1.014-.27-1.128l-.002-.001c-.036-.019-.209-.05-.335-.072l-.044-.007h-.002c-.267-.047-.569-.1-.838-.251A2.975 2.975 0 0015.734 2a3.678 3.678 0 00-2.344 1.05A.75.75 0 1112.32 2c.867-.883 2.137-1.445 3.397-1.5a4.52 4.52 0 012.142.554c.066.032.25.064.373.085h.002c.397.07.891.155 1.233.55.438.457.632 1.034.66 2.013.213.798.213 1.832.213 2.527.128.166.354.604.18 1.455-.198.892-.795 1.558-1.293 2.04-.07.082-.258.456-.383.704-.166.335-.327.656-.499.906v.966zm-7.503 3.002l3.294.715A3.02 3.02 0 0116.5 18.95v1.8a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-1.8c0-1.401.995-2.634 2.364-2.931l3.294-.715v-.974a8.144 8.144 0 01-.5-.893L5.14 13.4c-.126-.246-.303-.588-.381-.677-.531-.519-1.101-1.17-1.278-2.03-.177-.855.046-1.295.167-1.53l.001-.367c-.018-.923-.018-1.73.177-2.27.686-1.902 2.731-2.963 4.397-3.026.825.021 1.49.2 2.146.564.057.029.246.06.372.081h.005c.388.067.87.149 1.212.519.457.498.647 1.077.671 2.05.21.807.21 1.907.21 2.51.13.172.353.612.176 1.469-.177.859-.747 1.51-1.282 2.034-.077.086-.258.444-.382.69l-.008.016c-.167.332-.328.648-.5.897v.972zM1.5 20H15v-1.05c0-.7-.498-1.317-1.182-1.465l-3.885-.843a.751.751 0 01-.591-.734v-1.84c0-.201.08-.393.223-.534.095-.101.31-.524.437-.777.234-.464.436-.864.681-1.101.392-.385.767-.802.861-1.267.07-.34.029-.422-.034-.545v-.002l-.004-.006a1.304 1.304 0 01-.168-.614c0-.512 0-1.582-.178-2.19a.71.71 0 01-.03-.2c-.01-.861-.158-1.022-.276-1.151-.03 0-.226-.033-.364-.057l-.013-.002c-.267-.046-.568-.098-.837-.247A2.872 2.872 0 008.23 5c-1.087.042-2.539.77-2.995 2.034-.115.322-.098 1.2-.087 1.728v.005l.006.457c0 .281-.103.485-.17.619h-.001c-.063.123-.105.206-.034.546.094.466.469.884.86 1.267.24.233.44.624.674 1.077l.012.024c.129.253.345.676.441.778.132.14.222.34.222.533v1.84a.75.75 0 01-.591.734l-3.885.843A1.51 1.51 0 001.5 18.95V20z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="flex flex-col flex-grow ml-5 my-auto">
                  <div class="mb-0">
                    <p class="text-base text-blue-500 font-medium">
                      {{campaign.donor_count}} people have donation
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-for="(com, index) in reduceComment"
                :key="index"
                class="flex flex-row border-t border-gray-200 py-4"
              >
                <div class="flex-inline w-10 h-10 bg-blue-200 p-2 rounded-full">
                  <svg
                    class="text-blue-500 mx-auto"
                    width="22"
                    height="22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.255 13.965c-.73-.64-1.613-1.194-2.628-1.645a.86.86 0 10-.698 1.57c.856.381 1.593.84 2.191 1.366a3.427 3.427 0 011.161 2.576v1.59a.86.86 0 01-.86.86H2.579a.86.86 0 01-.86-.86v-1.59c0-.989.424-1.927 1.162-2.576.868-.763 3.398-2.537 8.12-2.537a6.367 6.367 0 006.36-6.36A6.367 6.367 0 0011 0a6.367 6.367 0 00-6.36 6.36c0 2.05.976 3.875 2.486 5.04-2.764.607-4.483 1.776-5.38 2.565A5.146 5.146 0 000 17.832v1.59A2.581 2.581 0 002.578 22h16.844A2.581 2.581 0 0022 19.422v-1.59a5.146 5.146 0 00-1.745-3.867zM6.359 6.36A4.646 4.646 0 0111 1.72a4.646 4.646 0 014.64 4.64A4.646 4.646 0 0111 11a4.646 4.646 0 01-4.64-4.64z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="flex flex-col flex-grow ml-5">
                  <div class="mb-0">
                    <p class="text-sm font-medium">₦{{com.amount}}</p>
                    <p class="text-xs text-gray-600 mt-1">{{com.donor_name}}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">an hour ago</p>
                </div>
              </div>
              <div>
                <div class="text-sm font-medium mb-2">Share via</div>
                <p class="text-sm text-gray-500">
                  Help by sharing this fundraisers on your social networks to
                  raise up to 5 times more.
                </p>
              </div>
              <div class="mt-5">
                <ul class="flex flex-row gap-3 w-max">
                  <li @click="socialShare('share')" id="share" class="share-icon bg-gray-200">
                    <svg
                    @click="socialShare('share')"
                      id="share"
                      class="mx-auto my-auto"
                      width="18"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.587 17.571A4.11 4.11 0 011.66 16.34C.824 15.504.388 14.41.43 13.257c.045-1.19.583-2.333 1.555-3.306l1.752-1.758a.67.67 0 11.949.945l-1.753 1.76c-1.42 1.42-1.554 3.267-.326 4.495 1.227 1.227 3.075 1.093 4.494-.326l2.407-2.407c.73-.73 1.132-1.563 1.163-2.409a2.782 2.782 0 00-.837-2.086 2.964 2.964 0 00-.627-.48.67.67 0 11.663-1.164 4.3 4.3 0 01.91.697c.836.836 1.273 1.93 1.23 3.083-.045 1.19-.582 2.333-1.555 3.306l-2.407 2.407c-.973.973-2.116 1.51-3.306 1.555a4.243 4.243 0 01-.155.002zm4.455-6.342a.67.67 0 00-.25-.914 2.965 2.965 0 01-.627-.48C6.937 8.607 7.07 6.759 8.49 5.34l2.406-2.407c1.42-1.419 3.268-1.553 4.495-.326 1.227 1.228 1.093 3.076-.327 4.496l-1.752 1.76a.67.67 0 10.949.944l1.751-1.758c.973-.973 1.51-2.116 1.555-3.306.043-1.152-.394-2.247-1.23-3.083A4.109 4.109 0 0013.257.431c-1.19.045-2.333.583-3.306 1.555L7.543 4.393C6.571 5.366 6.033 6.51 5.99 7.7c-.043 1.152.393 2.247 1.229 3.083.275.275.581.51.91.697a.666.666 0 00.914-.25z"
                        fill="#86949D"
                      />
                    </svg>
                  </li>
                  <li @click="socialShare('whatsapp')" id="whatsapp" class="share-icon bg-whatsapp">
                    <svg
                    @click="socialShare('whatsapp')"
                      id="whatsapp"
                      class="mx-auto my-auto"
                      width="18"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.428 17.571l1.199-4.259A8.525 8.525 0 01.45 8.98C.45 4.265 4.286.429 9 .429c4.716 0 8.552 3.836 8.552 8.55 0 4.716-3.836 8.552-8.551 8.552a8.54 8.54 0 01-4.18-1.09L.427 17.57zm4.617-2.686l.262.16A7.085 7.085 0 009 16.08c3.915 0 7.1-3.185 7.1-7.1 0-3.916-3.185-7.1-7.1-7.1a7.109 7.109 0 00-7.1 7.1c0 1.364.387 2.689 1.12 3.83l.177.275-.69 2.453 2.537-.653z"
                        fill="#fff"
                      />
                      <path
                        d="M6.599 5l-.555-.03a.671.671 0 00-.477.163c-.269.233-.699.685-.831 1.273-.197.878.107 1.952.895 3.027.788 1.074 2.257 2.793 4.853 3.528.837.236 1.495.077 2.003-.248.402-.257.68-.67.78-1.137l.088-.414a.287.287 0 00-.16-.321l-1.876-.865a.288.288 0 00-.348.086l-.736.954a.21.21 0 01-.237.07c-.504-.177-2.193-.884-3.12-2.669a.213.213 0 01.028-.237l.703-.814c.072-.083.09-.2.047-.301l-.808-1.891A.288.288 0 006.599 5z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                  <li @click="socialShare('mail')" id="mail" class="share-icon bg-gray-200">
                    <svg
                    @click="socialShare('mail')"
                      id="mail"
                      class="mx-auto my-auto"
                      width="24"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.888 3.146L20.45 17.57H3.196L2.04 3.425l9.785 5.478 10.064-5.757z"
                        fill="#F2F2F2"
                      />
                      <path
                        d="M21.401.429l-9.576 8.996L2.248.429h19.153z"
                        fill="#F2F2F2"
                      />
                      <path
                        d="M3.197 4.582v12.99H1.633a1.061 1.061 0 01-1.06-1.062V2.67l1.713.046.91 1.866z"
                        fill="#F14336"
                      />
                      <path
                        d="M23.076 2.67v13.84c0 .586-.476 1.061-1.062 1.061h-1.563V4.582l.866-2.044 1.759.131z"
                        fill="#D32E2A"
                      />
                      <path
                        d="M23.076 1.49v1.18L20.45 4.581l-8.627 6.289-8.627-6.289L.572 2.67V1.49c0-.585.475-1.06 1.061-1.06h.614l9.577 6.98 9.577-6.98h.613c.587 0 1.062.475 1.062 1.06z"
                        fill="#F14336"
                      />
                      <path
                        d="M3.197 4.582L.572 4.176V2.669l2.625 1.913z"
                        fill="#D32E2A"
                      />
                    </svg>
                  </li>
                  <li @click="socialShare('twitter')" id="twitter" class="share-icon bg-twitter">
                    <svg
                    @click="socialShare('twitter')"
                      id="twitter"
                      class="mx-auto my-auto"
                      width="22"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.384 2.458a9.02 9.02 0 01-2.492.683 4.3 4.3 0 001.903-2.39c-.836.498-1.76.85-2.743 1.046a4.324 4.324 0 00-7.482 2.958c0 .343.029.673.1.987-3.596-.176-6.778-1.9-8.916-4.525a4.355 4.355 0 00-.592 2.187c0 1.498.772 2.825 1.921 3.594a4.272 4.272 0 01-1.954-.532v.047c0 2.102 1.5 3.848 3.466 4.25a4.316 4.316 0 01-1.134.143c-.277 0-.557-.016-.82-.074.561 1.713 2.151 2.972 4.042 3.013A8.691 8.691 0 011.32 15.69c-.354 0-.695-.016-1.035-.06a12.177 12.177 0 006.636 1.941c7.96 0 12.311-6.593 12.311-12.308 0-.191-.007-.376-.016-.56a8.63 8.63 0 002.168-2.245z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                  <li @click="socialShare('telegram')" id="telegram" class="share-icon bg-telegram">
                    <svg
                    @click="socialShare('telegram')"
                      id="telegram"
                      class="mx-auto my-auto"
                      width="22"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.524 7.506L19.658.514c.841-.304 1.576.205 1.304 1.478l.001-.001-3.087 14.546c-.229 1.03-.842 1.282-1.7.796l-4.701-3.466-2.268 2.185c-.25.25-.462.463-.948.463l.334-4.785 8.714-7.873c.38-.334-.085-.522-.585-.19l-10.769 6.78L1.311 9c-1.008-.32-1.03-1.007.213-1.493z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                  <li @click="socialShare('message')" id="message" class="share-icon bg-message">
                    <svg
                      @click="socialShare('message')"
                      id="message"
                      class="mx-auto my-auto"
                      width="20"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.301.429C5.007.429.715 3.963.715 8.323c0 2.52 1.433 4.763 3.664 6.209l-.506 3.04 3.42-1.75c.947.256 1.958.396 3.008.396 5.295 0 9.587-3.534 9.587-7.895 0-4.36-4.292-7.894-9.587-7.894z"
                        fill="#fff"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Donation info screen -->
            <div v-if="stage === 'info'" class="flex flex-col">
              <div class="flex flex-col flex-auto relative mb-6">
                <button
                  class="absolute top-0 left-0 py-1.5 pr-3"
                  @click.prevent="goBackToStage('start')"
                >
                  <svg
                    width="10"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.872 7.561L8.26.173a.616.616 0 01.87.87L2.177 7.996 9.13 14.95a.616.616 0 01-.87.87L.872 8.433a.616.616 0 010-.871z"
                      fill="#767E85"
                    />
                  </svg>
                </button>
                <div
                  class="text-center flex-grow pb-4 border-b border-gray-300"
                >
                  <span class="text-xl text-gray-600 font-semibold">
                    Donation
                  </span>
                </div>
              </div>
              <v-form
                id="donation-form"
                ref="form"
                :loading.sync="loading"
                :on-submit="onSubmit"
                :on-success="onSuccess"
                success-message="Donation created successfullly"
              >
                <div class="form-group mb-5">
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="donation"
                      rules="required"
                    >
                      <input
                        id="input-donation"
                        v-model="form.donation"
                        class="form-input"
                        :class="classes"
                        placeholder="₦ Enter your donation"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="mb-5">
                  <span class="text-blue-600">Platform fee:</span>
                  <span class="form-input text-blue-600">{{
                    form.donation && !isNaN(form.donation)
                      ? (5 / 100) * Number(form.donation)
                      : 0
                  }}</span>
                </div>
                <div class="form-group mb-5">
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="first_name"
                      rules="required"
                    >
                      <input
                        id="input-first_name"
                        v-model="form.first_name"
                        class="form-input"
                        :class="classes"
                        placeholder="First name"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="last_name"
                      rules="required"
                    >
                      <input
                        id="input-last_name"
                        v-model="form.last_name"
                        class="form-input"
                        :class="classes"
                        placeholder="Last name"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="address"
                      rules="required"
                    >
                      <input
                        id="input-address"
                        v-model="form.email"
                        class="form-input"
                        :class="classes"
                        placeholder="Email address"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                    <label for="input-description">Comments</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="comment"
                      rules="required"
                    >
                      <textarea
                        id="input-description"
                        v-model="form.comment"
                        class="form-input"
                        :class="classes"
                        placeholder="Comment"
                      >
                      </textarea>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                </div>
                <div class="form-group mb-5">
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="address"
                      rules="required"
                    >
                      <v-checkbox
                        v-model="form.hide_public"
                        name="ussd"
                        value="ussd"
                        :class="classes"
                      >
                        Hide my information from the public
                      </v-checkbox>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <template v-slot:footer>
                  <div class="flex flex-row mt-5">
                    <v-button
                      :loading="loading"
                      block
                      class="mb-6"
                      @click.prevent="gotoStage('method')"
                    >
                      Continue
                    </v-button>
                  </div>
                </template>
              </v-form>
              <div class="flex flex-auto">
                <div class="flex flex-row mx-auto">
                  <i class="mr-4">
                    <img width="16" height="16" src="/secured-by-ajoo.ng.png" />
                  </i>
                  <div class="text-sm text-gray-600 my-auto">
                    Secured by <span class="font-medium">Wefundx</span>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
          <v-button variant="light" block class="mt-6">
            <svg
              class="inline-flex my-auto"
              width="14"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.529 9.388l-1.18-2.95 1.18-2.951a.469.469 0 00-.435-.643H7.625V1.75a.469.469 0 00-.469-.469H1.375V.47a.469.469 0 00-.938 0V15.53a.469.469 0 10.938 0V8.47h3.75v1.094a.47.47 0 00.469.468h7.5a.469.469 0 00.435-.643zM6.688 7.531H1.375V2.22h5.313V7.53zm.037 1.563l.763-.762A.474.474 0 007.625 8V3.781h4.776l-.992 2.482a.469.469 0 000 .349l.992 2.482H6.725z"
                fill="#575B68"
              />
            </svg>
            <span class="pl-2">Report this campaign</span>
          </v-button>
        </div>
      </div>
      <div class="mt-10 mb-14">
        <h3 class="text-2xl font-bold mb-4">Comment</h3>
        <hr class="border-gray-300" />
        <div
          v-for="(com, index) in comments"
          :key="index"
          class="flex flex-row border-b border-gray-300 py-5 lg:pr-24"
        >
          <div class="flex-inline w-10 h-10 bg-blue-200 p-2 rounded-full">
            <svg
              class="text-blue-500 mx-auto"
              width="22"
              height="22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.255 13.965c-.73-.64-1.613-1.194-2.628-1.645a.86.86 0 10-.698 1.57c.856.381 1.593.84 2.191 1.366a3.427 3.427 0 011.161 2.576v1.59a.86.86 0 01-.86.86H2.579a.86.86 0 01-.86-.86v-1.59c0-.989.424-1.927 1.162-2.576.868-.763 3.398-2.537 8.12-2.537a6.367 6.367 0 006.36-6.36A6.367 6.367 0 0011 0a6.367 6.367 0 00-6.36 6.36c0 2.05.976 3.875 2.486 5.04-2.764.607-4.483 1.776-5.38 2.565A5.146 5.146 0 000 17.832v1.59A2.581 2.581 0 002.578 22h16.844A2.581 2.581 0 0022 19.422v-1.59a5.146 5.146 0 00-1.745-3.867zM6.359 6.36A4.646 4.646 0 0111 1.72a4.646 4.646 0 014.64 4.64A4.646 4.646 0 0111 11a4.646 4.646 0 01-4.64-4.64z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="flex flex-col flex-grow ml-5">
            <div class="mb-4">
              <p class="text-sm font-medium">{{com.donor_name}} donated ₦{{com.amount}}</p>
              <p class="text-xs text-gray-500 mt-1">{{com.created_day}}</p>
            </div>
            <p class="text-sm text-gray-600">
              {{com.comment}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ProgressBar from 'vue-simple-progress';
import { mapState } from 'vuex';
export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      stage: 'start',
      loading: false,
      indexImage: 0,
      campaign: {},
      user: {},
      comments: [],
      reduceComment: [],
      form: {
        donation: '',
        first_name: '',
        last_name: '',
        email: '',
        comment: ''
      },
    }
  },
  computed: {
      ...mapState({
      campData: (state) => state.app.campaign,
      userData: (state) => state.auth.user,
    })
  },
  watch: {
    campData(newValue, oldValue){
     const daysLeft = (startDate, endDate) => {
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        const millisecondsPerDay = 1000 * 60 * 60 * 24
        const startDateUTC = Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
        const endDateUTC = Date.UTC(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        )
        return Math.floor((endDateUTC - startDateUTC) / millisecondsPerDay)
      }
     const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();
      const today_date = year + '-' + ("0" + (month + 1)).slice(-2) + '-' + ("0" + day).slice(-2);
     const { end_date, start_date, donations, campaign_target, total_donated } = newValue;

      let number = Number(campaign_target.replace(/[^0-9.-]+/g, ''))
      const percentage = (total_donated / number) * 100;

    // calculate to see expired date
      const dayCheck = daysLeft(start_date, end_date)
      const current = daysLeft(start_date, today_date)
     const created_day =
          start_date == today_date
            ? 'Today'
            : parseInt(current) + ' days ago';

     let lapsed = dayCheck + ' days left'
        lapsed = parseInt(dayCheck) < 0 ? 'expired' : lapsed;
     this.campaign = {...newValue, created_day, lapsed, percentage};

     //donations comments
     const donorComments = donations.map((d)=>{
        const {comment, donor_name, createdAt, amount} = d;
        const newStartDate = createdAt.split("-");
        const created_day = parseInt(newStartDate[2]) == today ? "Today": parseInt(newStartDate[2]) + ' days ago';
        return {comment, donor_name, created_day, amount};
     });

     this.comments = donorComments;

    // reduce comment
    const sliceIntoChunks = (arr, chunkSize) => {
                const res = [];
                for (let i = 0; i < arr.length; i += chunkSize) {
                    const chunk = arr.slice(i, i + chunkSize);
                    res.push(chunk);
                }
                return res;
            }
    const reduceData = sliceIntoChunks(donorComments, 4);
     this.reduceComment = reduceData[0];
     //console.log(this.reduceComment, '572');
     },
     userData(newValue, oldValue){
      this.user = {...newValue};
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchCampaign', this.$route.params.slug);

    //load
     let paystack = document.createElement('script')
      paystack.setAttribute('src', 'https://js.paystack.co/v1/inline.js')
      document.head.appendChild(paystack)
  },
  methods: {
    socialShare(id){
      const url = 'https://www.wefundx.com';
      switch(id){
        case 'share':
          return navigator.share({
            title: this.campaign.title,
            text: 'find more campaign on wefundx',
            url: `${url}/campaigns/preview/${this.campaign.id}`,
          });
        break;
        case 'whatsapp':
          return window.open(`whatsapp://send?text=${url}/campaigns/preview/${this.campaign.id}`);
          break;
        case 'mail':
          return window.open('mailto:');
          break;
        case 'telegram':
          return window.open(`https://t.me/share/url?url=${url}/campaigns/preview/${this.campaign.id}&text=find more campaign on wefundx`);
          break;
        case 'twitter':
          return window.open(`https://twitter.com/share?text=${
            this.campaign.title
            }text&url=${url}/campaigns/preview/${this.campaign.id}`);
            break;
        case 'facebook':
          return window.open(`https://www.facebook.com/sharer.php?u=${url}/campaigns/preview/${this.campaign.id}`);
            break;
            default:
      }
    },
    goBackToStage(stage) {
      this.stage = stage || 'start'
    },
    handleImageIndex(index){
      this.indexImage = index
    },
    gotoStage(stage) {
      this.loading = true
      if(stage == 'method'){
           let {
        donation,
       first_name,
        last_name,
        email,
        comment
      } = this.form;

      // fee calculation
      let fees = donation && !isNaN(donation) ? (5 / 100) * Number(donation) * 100 : 0;

      //fetch campaign id
      const campaign_id = this.campaign.id;

      //donation rounded figure
      donation *= 100;
      //check for signed in user
      const donor_anonymous = this?.user?.first_name !== undefined ? false : true;
      //donation details
      const form = {
                  amount: donation + fees,
                  donor_name: first_name + ' ' + last_name,
                  donor_email: email,
                  donor_anonymous,
                  campaign_id,
                  comment
        }
      // reset form
      const resetForm = () => {
        this.stage = 'start'
        this.loading = false
      }
        // fee calculation
      let fee = donation && !isNaN(donation) ? (5 / 100) * Number(donation) * 100 : 0;

      //make donations
      const createDonations = async()=>{
          return this.$store.dispatch('auth/createDonation', form)
      }

      //verify donations
      const verifyDonation = async(ref)=>{
          return this.$store.dispatch('auth/verifyDonation', ref)
      }
      // paystack connection
      const makePayment = (ref, key) =>{
          // paystack
              let handler = PaystackPop.setup({
                key, // Replace with your public key
                email,
                amount: donation + fee,
                ref,
                // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                // label: "Optional string that replaces customer email"
                onClose: function(){
                  alert('Window closed.');
                },
                callback: function(response){
                  resetForm();
                  //verify dovation
                  verifyDonation(response.reference);
                  //console.log(response)
                }
              });

              // open frame
              handler.openIframe();
      }

      //create donation and attached reference to it
      createDonations().then(({data})=>{
        const { donation } = data.data;
        let key = this.$config.testkey;
             makePayment(donation.reference, key);
          });

      }else {
          setTimeout(() => {
        this.stage = stage || 'start'
        this.loading = false
        }, 1000)
      }

    },
    onSuccess() {},
    onSubmit() {

    },
  },
}
</script>

<style scoped>
.share-icon {
  @apply flex justify-items-center rounded-full w-10 h-10 cursor-pointer;
}
.bg-whatsapp {
  background-color: #1bd741;
}
.bg-twitter {
  background-color: #03a9f4;
}
.bg-telegram {
  background-color: #039be5;
}
.bg-message {
  background-color: #66cc70;
}
.campaign_preview {
  align-items: flex-start;
  justify-content: space-between !important;
}
</style>
