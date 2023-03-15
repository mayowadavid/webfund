<template>
<div class="px-4 sm:px-5 lg:px-10 mb9 mb-auto">
  <div class="banner px-4 flex_col  mb-tp10 sm:px-5 lg:px-10">
          <div class="about mb-p">
            <p>About Us</p>
          </div>
          <div class="paragraph mb-tp5 m8 sm10 flex-wrap flex_col">
                <p class="m10 sm10">{{paragragphOne}}</p>
                <p class="m10 sm10">{{paragragphTwo}}</p>
          </div>
    </div>
    <div class="story mb-space flex_row  mb-tp10 mb-item-start mb-auto mb10 ">
        <div class="story_image m10 sm10 mb5">
            <img class="m10 sm10" src="/boy-b.jpg" alt="" srcset="">
        </div>
        <div class="story_content m-tp1 mb-p m10 sm10 mb5">
            <div class="story_header mb-p-head">
                <p>Our Story</p>
            </div>
            <p >Wefundx was founded in 2019 as a crowdfunding platform. It had one key purpose, to connect a population of over 100 millions of Nigerians that has been financially excluded to the crowd of donors for their unexpected and urgent financial need. We recorded some success but with challenges of its own.
            </p>
            <br>
            <p >We understand how complex it is to take donations,
                we make it simple to accept donations using several methods locally, internationally and also through bitcoin. Our solution will make it easy for crowdfunders and nonprofits to receive donations
                from donors on a recurring basis or one-time basis.
            </p>
            <br>
            <p >
                We are that tech company that has taken it upon ourselves to cater for crowdfunders and non-profits because we understand the importance of what they do and the lives they are changing.
             </p>
        </div>
    </div>
    <div class="story-value mb-space mb-tp10 flex_row mb-auto mb10 ">
        <div class="story_content mb-p m10 sm10 mb4">
            <div class="story_header mb-p-head">
                <p>Our Values</p>
            </div>
            <div class="donor_pay m10 sm10 mb10 flex_row">
                <div class="donor_pay_row flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Social-centered solutions </p>
                </div>
                <div class="donor_pay_row flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Customer-centered solutions</p>
                </div>
                <div class="donor_pay_row flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Trust, Transparency and Accountability</p>
                </div>
                <div class="donor_pay_row flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Dependable</p>
                </div>
                <div class="donor_pay_row flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">Respect and love</p>
                </div>
            </div>
        </div>
        <div class="story_image m-tp1 m10 sm10 mb6">
            <img class="mb9 m10" src="/boy-c.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="story mb-space flex_row mb-tp10 mb-item-start mb-auto mb10 ">
        <div class="story_image m10 sm10 mb5">
            <img class="m10" src="/kid.png" alt="" srcset="">
        </div>
        <div class="story_content m-tp1 mb-p m10 sm10 mb5">
            <div class="story_header mb-p-head">
                <p>Our Mission</p>
            </div>
            <p class="mb10 mb-space">Our mission is to create solutions that target the huge segment of the population that has been financially excluded, directly or indirectly.
            </p>
            <div class="story_header mb-tp5 mb-p-head">
                <p>Our Vision</p>
            </div>
            <p class="mb10">Our vision is to help crowdfunders and nonprofits grow through easy donation raising from all over the world changing as many lives as they can.
            </p>
        </div>
    </div>
    <div class="our-team mb-space mb-tp10 mb-btm10 flex_col mtp-tp10 mb10  mb-auto">
        <div class="team_header m10 sm10 mb-p-head">
            <p>Our Team</p>
        </div>
        <div class="team_wrapper mb-tp5 mb10 flex_row">
            <div v-for="wef in teams" :key="wef.name" class="team_image m-tp1 flex_col mb-p m10 sm10 mb3">
                <img :src="wef.img" alt="">
                <p>{{wef.name}}</p>
                <p>{{wef.role}}</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      paragragphOne: 'Platform for Donations',
      paragragphTwo: 'Wefundx is a crowdfunding platform and a poweful tool fo social changes in Nigeria and Africa as a whole',
      teams: [
        {name: 'Micheal Adebanjo', role: 'Executive Director', img: '/banjo.jpg'},
         {name: 'Abideen Olamilekan', role: 'Director of Operations', img: '/banjo-d.jpg'},
        {name: 'Joshua Adebanjo', role: 'Communications Director', img: '/banjo-b.jpg'},
        ]
    }
  }
}
</script>
<style>
.about > p {
  font-weight: bold;
}
.story_image > img {
    width: clamp(100px, 30vw, 550px);
    height: clamp(100px, 30vw, 300px);
    border-radius: 10px;
    object-fit: cover;
}

.team_header > p {
  text-align: center;
}

.team_image > p:nth-child(2) {
  font-weight: bold !important;
  font-size: clamp(8px, 5vw, 20px);
  margin-top: 10px;
}

.team_image > img {
    width: 180px;
    height: 180px;
    margin-bottom: 10px;
    object-fit: cover;
    border-radius: 150px;
}
</style>
