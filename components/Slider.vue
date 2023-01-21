<template>
  <div class="w-full mb-10 overflow-hidden">
    <div class="flex items-center justify-between mb-8">
      <h4 class="font-bold text-xl text-[#212121]">{{ title }}</h4>
      <div class="flex">
        <button class="h-7 w-7 flex items-center justify-center button-prev"
          @click="prev()"
        >
          <img src="/icon/Button/Back.svg" alt="" />
        </button>
        <button
          class="h-7 w-7 ml-2 flex items-center justify-center button-next"
          @click="next()"
        >
          <img src="/icon/Button/Forward.svg" alt="" />
        </button>
      </div>
    </div>

    <client-only>
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide v-for="(item, i) in campaigns" :key="i">
          <div class="bg-white h-[596px] w-full 2xl:max-w-[400px] xl:max-w-[385px] ">
            <a :href="'/campaigns/preview/'+ item.id">
            <img class="w-full h-[265px]" :src="item.image" alt="" />
            </a>
            <div class="w-full p-5 py-3">
              <a :href="'/campaigns/preview/'+ item.id">
              <h5 class="text-base font-bold mb-2">
                {{item.title}}
              </h5>
              <div class="flex items-start mb-2">
                <img class="w-10 h-10 rounded-full" :src='item.organisation.logo' alt="" />
                <div class="ml-3">
                  <p class="font-bold text-sm">
                    {{item.organisation.name}}
                  </p>
                  <p class="text-xs text-[#9598A3]">{{item.organisation.category}}</p>
                </div>
              </div>
              <p class="text-sm font-bold ml-auto text-right text-[#575B68]">
                {{item.lapsed }}
              </p>
              <p class="text-xs font-normal text-[#575B68] mb-2">
                {{item.created_day}}
              </p>
              </a>
              <div class="flex items-center mb-2">
                <img class="w-5 mr-3" src="/icon/tag.svg" alt="" />
                <p class="text-[14px] font-light text-[#575B68]">
                  {{item?.campaign_type}}
                </p>
              </div>

              <div class="my-4 w-full">
                <progress-bar
                  bar-color="#26B872"
                  val="20"
                  size="12"
                ></progress-bar>
                <p class="text-sm font-normal text-[#575B68] mt-1">
                  {{item.campaign_target}} target goal
                </p>
              </div>

              <div class="flex flex-col items-center px-5">
                <p
                  class="
                    h-[48px]
                    w-full
                    mb-2
                    font-semibold
                    flex
                    items-center
                    justify-center
                    px-10
                    bg-[#006696]
                    text-white text-sm
                  "
                  :id="item.id"
                  @click="handlePopUp"
                >
                  Donate Now
                </p>
                <div class="flex items-center">
                  <img class="w-7 mr-2" src="/icon/people.svg" alt="" />
                  <p class="text-sm font-normal text-[#0396C2]">
                    {{item.donor_count}} people have donation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>

    <div class="flex justify-end mt-5">
      <a href="#" class="ml-auto text-[#F79D33] font-bold text-base"
        >View More</a
      >
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min'
import 'swiper/swiper-bundle.min.css'
import ProgressBar from 'vue-simple-progress';
import { mapState } from 'vuex';

export default {
  components: {
    ProgressBar,
  },
  props: {
    title: { type: String, default: '' },
  },
  async mounted() {
    await this.$nextTick()
    new Swiper(this.$refs.swiper, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },

  data() {
    return {
      items: 12,
      campaigns: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: -10,
        // slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev',
        },
        breakpoints: {
          1440: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    }
  },
  computed: {
      ...mapState({
      campData: (state) => state.app.allCampaign,
    })
  },
   watch: {
    campData(newValue, oldValue){
      console.log(newValue);
      const d = new Date();
      const today = d.getDate();
      const reformat = newValue.map((n)=>{
        const {
          end_date,
          start_date,
          } = n;
          const newStartDate = start_date.split("-");
          const newEndDate = end_date.split("-");
          const created_day = parseInt(newStartDate[2]) == today ? "Today": parseInt(newStartDate[2]) + ' days ago';
          let lapsed = parseInt(newEndDate[2]) - parseInt(today) + ' days left';
          lapsed = (parseInt(lapsed) < 0) ? 'expired': lapsed;
          return {created_day, lapsed, ...n};
      })
     this.campaigns = reformat;
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchAllCampaign');
  },

  methods:{
    prev() {
			this.$refs.swiper.$swiper.slidePrev();
		},
    handlePopUp(ev){
        const id = ev.target.id;
         this.$emit('donation', id);
    },
		next() {
			this.$refs.swiper.$swiper.slideNext();
		}
  }
}
</script>
