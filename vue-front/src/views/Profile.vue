<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
      <NavBarBuildingDoorman v-if="role === 2" id="full"></NavBarBuildingDoorman>
      <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
      <NavBarAdmin v-if="this.dataUserLogin.is_admin" id="full"></NavBarAdmin>
    </div>
    <div class="row" style="margin-top: 120px;">
      <b-col>
        <router-link to="/login">
          <div class="back">
            <span class="d-none d-lg-block">VOLVER</span>
            <font-awesome-icon icon="fa-solid fa-tent-arrow-turn-left" style="font-size: 30px; "></font-awesome-icon> 
          </div>
        </router-link>
      </b-col>
    </div>
    <div class="row">
      <b-col>
        <span class="title"><b>PERFIL</b></span>
      </b-col>
    </div>
    <div class="row  flex-grow-1" style="margin-top: 123px ;">
      <div class="col-7 mr-auto ml-auto">
        <Profile></Profile>
      </div>
    </div>
    <div class="row">
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
    this.role = this.dataUserLogin.role_id
  },
  data: () => ({
    dataUserLogin: {},
    role: null
  })
}
</script>

<style>
</style>
