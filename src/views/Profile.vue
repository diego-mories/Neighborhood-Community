<template>
  <div class="screen">
    <div class="row" id="grid-top">
      <Profile></Profile>
    </div>
    <div class="row" id="grid-bottom">
      <FooterSocialNetwork></FooterSocialNetwork>
    </div>
  </div>
</template>

<script>
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import Profile from '../components/Profile.vue'
export default {
  components: {
    FooterSocialNetwork,
    Profile
  }

}
</script>

<style>

</style>
