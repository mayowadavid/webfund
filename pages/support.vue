<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-10">
       <Navbar transparent />
      <div class="banner px-4 flex_col  mb-tp10 sm:px-5 lg:px-10">
          <div class="about mb-p">
            <p>Support</p>
          </div>
          <div class="paragraph mb-tp5 m8 sm10 flex-wrap flex_col">
                <p class="m10 sm10">{{paragragphOne}}</p>
                <p class="m10 sm10">{{paragragphTwo}}</p>
          </div>
    </div>
    </div>
     <div class="banner px-4 flex_col sm:px-5 lg:px-10">
            <div class="support mb-p-head mb-tp5 m8 sm10 flex-wrap flex_col">
                  <p class="m10 sm10">{{paragragph}}</p>
            </div>
            <div class="doc_box mb-btm10 px-4 sm:px-5 mb10 flex_row">
            <div v-for="con in documentationRow" :key="con.name" class="doc_box_con mb-tp5 m10 sm10 mb-p shadows mb3">
                <p>{{con.name}}</p>
                <p>{{con.description}}</p>
            </div>
        </div>
    </div>
    <div class="banner bg-[#E1F7FE] px-4 flex_col sm:px-5 lg:px-10">
            <div class="paragraph mb-tp5 m8 sm10 flex-wrap flex_col">
                  <p class="m10 sm10">{{devParagraphOne}}</p>
                  <p class="m10 sm10">{{devParagraphTwo}}</p>
            </div>
            <div class="doc_box mb-btm10 px-4 sm:px-5 mb10 flex_row">
            <div v-for="con in entryRow" :key="con.name" class="doc_box_con mb-tp5 m10 sm10 mb-p shadows mb4">
                <p>{{con.name}}</p>
                <p>{{con.description}}</p>
            </div>
        </div>
    </div>
    <div class="support_showcase space sm-off m-off mb8 px-4 sm:px-5 lg:px-10 flex_row">
            <img src="/business day.png" alt="" srcset="">
            <img src="/guardian.png" alt="" srcset="">
            <img src="/press-release.png" alt="" srcset="">
            <img src="/punch.jpg" alt="" srcset="">
            <img src="/this day.png" alt="" srcset="">
    </div>
     <div class="w-full py-20 px-5 md:px-16">
      <div class="bg-white shadows xl:max-w-[1200px] lg:max-w-[900px] p-10 text-center mx-auto">
        <h3 class="text-3xl font-bold text-[#2B384C] mb-8">
          Sign up for free and get started
        </h3>
        <p class="text-base text-center text-[#575B68] font-light mb-5 max-w-[31rem] mx-auto">
          Convert online donors with smart donation forms augmented with the latest digital techniques. Full flexibility so you look like a pro
        </p>
        <div class="flex items-center justify-center mx-auto">
          <a href="/signup">
          <button
              class="
                h-10 w-32
                broder-0 bg-[#006696]
                text-white text-sm
                font-semibold
                flex
                items-center
                justify-center
              "
            >
              Get Started
            </button>
            </a>
            <a href="/solution">
            <button
              class="
                h-10 w-32 ml-2
                border border-[#0396C2]
                text-[#0396C2] text-sm
                font-semibold
                flex
                items-center
                justify-center
              "
            >
              Learn more
            </button>
            </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'landing',
  data() {
    return {
      paragragph: 'Here are some of our most common entries',
      paragragphOne: 'We’re happy to help!',
        paragragphTwo: 'Need a quick answer? Enter your question below for instant responses.',
       devParagraphOne: 'Still need answers?',
        devParagraphTwo : 'Get in touch! We look forward to hearing from you.',
        documentationRow: [
        {name: 'How to turn on international Donation on Wefundx?', description: ''},
         {name: 'Can Wefundx process donation in USD/international currencies?', description: ''},
          {name: 'Can i accept fundraising payment in Bitcoin?', description: ''},
      ],
      entryRow: [
        {name: 'General Support', description: 'Do you have general enquiries or need support? Please send us a quick email.'},
         {name: 'Press & Media Kit', description: 'Get company info, bios, photos, brand assets, and other media resources.'}
         ]
    }
  },
}
</script>
<style>
.doc_box {
    gap: 5%;
    justify-content: start !important;
}

.doc_box_con {
    padding: 25px;
    background-color: #fff;
}

.doc_box_con > p:first-child {
    font-weight: bold;
    color: #0396C2;
    margin-bottom: 10px;
}
</style>
