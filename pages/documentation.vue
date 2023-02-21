<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-10">
      <Navbar transparent />
      <div class="banner px-4 flex_col sm:px-5 lg:px-10">
            <div class="paragraph mb-tp5 m8 sm10 flex-wrap flex_col">
                  <p class="m10 sm10">{{paragragphOne}}</p>
                  <p class="m10 sm10">{{paragragphTwo}}</p>
            </div>
      </div>
    </div>
    <div class="documentation_wrap mb-tp5 mb-btm10 px-4 sm:px-5 lg:px-10 mb9 m10 sm10 mb-auto">
        <div class="doc_header px-4 sm:px-5 mb-btm5 mb10 mb-p-head">
            <p>Get Started</p>
        </div>
        <div class="doc_box mb-btm10 px-4 sm:px-5 mb10 flex_row">
            <div v-for="con in documentationRow" :key="con.name" class="doc_box_con mb-tp5 m10 sm10 mb-p shadows mb4">
                <p>{{con.name}}</p>
                <p>{{con.description}}</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'landing',
  scrollToTop: true,
  data() {
    return {
      paragragphOne: 'Wefundx Documentation',
      paragragphTwo: 'Welcome to the Wefundx Developer Documentation where you’ll learn how to build amazing fundraising experiences with the Wefundx API.',
      documentationRow: [
        {name: 'Accept Donation', description: 'Accept donations from cards, banks, bitcoin wallet, mobile money account'},
         {name: 'Monitor Donation', description: 'Accept donations from cards, banks, bitcoin wallet, mobile money account'},
          {name: 'Identity Donors', description: 'Accept donations from cards, banks, bitcoin wallet, mobile money account'},
           {name: 'Other ways to use wefundx', description: 'Accept donations from cards, banks, bitcoin wallet, mobile money account'}
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
}

.doc_box_con > p:first-child {
    font-weight: bold;
    color: #0396C2;
    margin-bottom: 10px;
}
</style>
