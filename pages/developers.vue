<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-10">
            <Navbar transparent />
            <div class="banner px-4 space sm:px-5 lg:px-10">
                  <div class="paragraph m8 sm10 flex-wrap flex_col">
                        <p class="m10 sm10">{{paragragphOne}}</p>
                        <p class="m10 sm10">{{paragragphTwo}}</p>
                  </div>
                  <div class="flex space items-center justify-center mx-auto">
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
                        Start campaign
                      </button>
                      </a>
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
                  </div>
            </div>
    </div>
    <div class="donor_note mb-btm10 mb-tp5 flex_row px-4 sm:px-5 lg:px-10">
      <div class="donor_con showcase-img m-tp1 sm-tp1 m-flex-center sm-flex-center m10 sm10 px-4 sm:px-5 lg:px-10 mb5">
            <img class="m10 mb10 sm10" src="/man-dev.png" alt="" srcset="">
        </div>
        <div class="donor_con m10 sm10 flex_col px-4 sm:px-5 lg:px-10 mb5">
            <p class="mb8 m10 sm10">Build custom Fundraising experiences with well-documented APIs</p>
            <p class="mb6 m10s">Developers love our thorough, well-documented APIs that let you to build everything from simple weekend projects, to complex organization fundraising serving hundreds of thousands of Donors. If you can imagine it, you can build it with Wefundx. </p>
            <div class="donor_pay sm10 m10 mb10 flex_row">
                <div v-for="pay in buildOptions" :key="pay.title" class="donor_pay mb-tp2 sm10 m10_row sm10 m10 flex_row mb10">
                    <img class="mb1" src="/check.png" alt="">
                    <p class="mb7">{{pay.title}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="banner bg-[#E1F7FE] px-4 flex_col sm:px-5 lg:px-10">
            <div class="paragraph mb-tp5 m8 sm10 flex-wrap flex_col">
                  <p class="m10 sm10">{{devParagrapone}}</p>
                  <p class="m10 sm10">{{devParagraptwo}}</p>
            </div>
            <div class="doc_box mb-btm10 px-4 sm:px-5 mb10 flex_row">
            <div v-for="con in documentationRow" :key="con.name" class="doc_box_con mb-tp5 m10 sm10 mb-p shadows mb3">
                <p>{{con.name}}</p>
                <p>{{con.description}}</p>
            </div>
        </div>
    </div>
    <div class="donor_note mb-btm10 mb-tp5 flex_row px-4 sm:px-5 lg:px-10">
            <div class="donor_con m10 sm10 flex_col px-4 sm:px-5 lg:px-10 mb5">
                <p class="mb8 m10 sm10">Delight donors with a seamless fundraising experience</p>
                <p class="mb6 m10s">Give your donors the gift of modern, fictionless, painless fundraising,
                    integrate wefundx once and let your donor donate you how much they want
                </p>
                <div class="donor_pay sm10 m10 mb10 flex_row">
                    <div v-for="pay in paymentOptions" :key="pay.title" class="donor_pay mb-tp2 sm10 m10_row sm10 m10 flex_row mb4">
                        <img class="mb1" src="/check.png" alt="">
                        <p class="mb7">{{pay.title}}</p>
                    </div>
                </div>
            </div>
            <div class="donor_con showcase-img m-tp1 sm-tp1 m-flex-center sm-flex-center m10 sm10 px-4 sm:px-5 lg:px-10 mb5">
                <img class="m10 mb10 sm10" src="/lap-img.png" alt="" srcset="">
            </div>
    </div>
    <div class="donor_note mb-btm10 flex_row px-4 sm:px-5 lg:px-10">
        <div class="donor_con m10 sm10 flex_col px-4 sm:px-5 lg:px-10 mb5">
            <p class="mb8 m10 sm10">Understand donors donation patterns</p>
            <p class="mb6 m10 divider">Your wefundx dashboard surfaces useful donors insight
                from your donation data
            </p>
            <div class="donor_pay mb-tp5 sm10 m10 mb5 flex_row">
                <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">see who your top donors are both in terms of numbers and donation</p>
                </div>
                <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">see your new and returning donor over any date range</p>
                </div>
                <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">see your new and returning donor over any date range</p>
                </div>
            </div>
        </div>
        <div class="donor_con m10 sm10 mb-space m-tp1 sm-tp1 m-flex-center sm-flex-center showcase-img px-4 sm:px-5 lg:px-10 mb-relative mb5">
            <div class="image_position m-tp1 sm-tp1 m-flex-center sm-flex-center">
                <img class="shadows" src="/mobile-front.png" alt="" srcset="">
            </div>
            <div class="image_position">
                <img class="shadows" src="/desk-back.png" alt="" srcset="">
            </div>
        </div>
    </div>
    <div class="donor_note mb-btm10 flex_row px-4 sm:px-5 lg:px-10">
        <div class="donor_con m10 sm10 m-tp1 sm-tp1 m-flex-center sm-flex-center px-4 sm:px-5 lg:px-10 back-showcase mb-relative mb5">
            <div class="image_position m-flex-center sm-flex-center reposition mb10">
                <img class="shadows" src="/mobile-front2.png" alt="" srcset="">
            </div>
            <div class="image_position m-flex-center sm-flex-center reposition mb10">
                <img class="shadows" src="/mobil-back1.png" alt="" srcset="">
            </div>
        </div>
        <div class="donor_con m10 sm10 mb-space m-tp1 sm-tp1 px-4 sm:px-5 lg:px-10 right_camp mb5">
            <div class="donor_con_right mb10 px-4 sm:px-5 lg:px-10">
                <p class="mb10 m10 sm10">Monitor your campaign performance while on the move</p>
                <p class="mb10 m10 divider">Sign up for wefundx and track your most important campaign metrics
                    on your mobile device. Monitor info such as donations, donors information, success rates and more
                </p>
            </div>
            <div class="donor_pay mb-tp5 sm10 m10 mb10 px-4 sm:px-5 lg:px-10 flex_row">
                <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Sign up to wefundx in minutes</p>
                </div>
                <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">look up donations</p>
                </div>
                <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Get instant support</p>
                </div>
            </div>
        </div>
    </div>
    <div class="guard_background px-4 sm:px-5 lg:px-10 spaces">
        <div class="donor_note flex_row mb9">
            <div class="donor_con px-4 m10 sm10 sm:px-5 lg:px-10 flex_col mb5">
                <p class="mb10 m10 sm10">Protect yourself and your customers
                    with advanced fraud detection
                </p>
                <p class="mb7 m10 divider">Paystack's combination of automated and manual
                    fraud systems protect you from fradulent transactions and associated chargeback claims.
                </p>
                <div class="donor_pay mb-tp5 sm10 m10 mb10 flex_row mb5">
                    <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                        <img src="/check.png" alt="">
                        <p class="mb8">Card</p>
                    </div>
                    <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                        <img src="/check.png" alt="">
                        <p class="mb8">Bitcoin</p>
                    </div>
                    <div class="donor_pay mb-tp5 sm10 m10_row sm10 m10 flex_row mb10">
                        <img src="/check.png" alt="">
                        <p class="mb8">Bank Account</p>
                    </div>
                </div>
            </div>
            <div class="donor_con px-4 m-tp1 sm-tp1 m-flex-center sm-flex-center m10 sm10 mb-space sm:px-5 lg:px-10 showcase-img mb5">
                <div class="guard">
                    <img src="/secure.png" alt="" srcset="">
                </div>
            </div>
        </div>
    </div>
    <div class="banner bg-[#E1F7FE] px-4 flex_col sm:px-5 lg:px-10">
            <div class="paragraph mb-tp5 mb-btm10 m8 sm10 flex-wrap flex_col">
                  <p class="m10 sm10">{{devParagrapthree}}</p>
                  <p class="m10 sm10">{{devParagrapfour}}</p>
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
      paragragphOne: 'Payments infrastructure for fundraising and donations',
        paragragphTwo: 'Connecting a population of over 100 millions of Nigerians that has been financially excluded to the crowd of donors for their unexpected and urgent financial need',
        devParagrapone : 'Raise Money for your Organization',
        devParagraptwo : 'How much can you raise with Wefundx?  Here’s how our APIs come together to help you raise money.',
        devParagrapthree : 'Wefundx powers growth for amazing Organization',
        devParagrapfour : 'Wefundx is a growth engine for a new generation of innovative, forward-looking organizations operating in Africa.',
        paymentOptions: [
          {title: 'card'},
          {title: 'Bitcoin'},
          {title: 'Bank Account'},
          {title: 'Mobile Money'},
          {title: 'Bank Transfer'},
          {title: 'Visa QR'},
          {title: 'USSD'},
        ],
        buildOptions: [
          {title: 'Collect one-time and recurring donations from your app or website'},
          {title: 'Make bitcoin donations'},
          {title: 'Retrieve all your donation and donors data'},
          {title: 'Verify the identity of donors'},
        ],
        documentationRow: [
        {name: 'Resolve Account Number API', description: 'Verify if the bank account details provided by customers are correct.'},
         {name: 'Transfer API', description: 'Automatically transfer money directly to your customer bank accounts.'},
          {name: 'Transactions API', description: 'Get paid by your customers in multiple currencies'},
      ]
      }
    }
}
</script>
<style>
.donor_note {
  align-items: flex-start !important;
}

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
