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
        <router-link to="/profile">
          <div class="back">
            <span class="d-none d-lg-block">VOLVER</span>
            <font-awesome-icon icon="fa-solid fa-tent-arrow-turn-left" style="font-size: 30px; "></font-awesome-icon>
          </div>
        </router-link>
      </b-col>
    </div>
    <div class="row">
      <b-col>
        <span class="title"><b>CAMBIAR CONTRASEÑA</b></span>
      </b-col>
    </div>
    <div class="row  flex-grow-1" style="margin-top: 123px ;">
      <div class="col-8 col-lg-5 mr-auto ml-auto">
        <ChangePasswordForm></change-passwordForm>
      </div>
    </div>
    <div class="row">
      <FooterSocialNetwork></FooterSocialNetwork>
    </div>
  </div>
</template>

<script>
import ChangePasswordForm from '../components/change-passwordForm.vue'
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
export default {
  data: () => ({
    dataUserLogin: {},
    role: null
  }),
  created () {
    this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = this.dataUserLogin.role_id
  },
  components: {
    NavBarPresident,
    NavBarOwner,
    NavBarAdmin,
    NavBarBuildingDoorman,
    ChangePasswordForm,
    FooterSocialNetwork
  }
}
</script>

<style>
</style>
