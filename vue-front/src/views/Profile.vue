<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
      <!-- <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
      <NavBarBuildingDoorman v-if="role === 2" id="full"></NavBarBuildingDoorman>
      <NavBarOwner v-if="role === 3" id="full"></NavBarOwner> -->
      <NavBarAdmin v-if="this.dataUserLogin.is_admin" id="full"></NavBarAdmin>
    </div>
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
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
export default {
  components: {
    FooterSocialNetwork,
    NavBarPresident,
    NavBarOwner,
    NavBarAdmin,
    NavBarBuildingDoorman,
    Profile
  },
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
  },
  data: () => ({
    dataUserLogin: {}
  })
}
</script>

<style>

</style>
