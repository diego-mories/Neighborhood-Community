<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
    <NavBarBuildingDoorman v-if="role === 2" id="full"></NavBarBuildingDoorman>
    <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    <NavBarAdmin v-if="this.dataUserLogin.is_admin" id="full"></NavBarAdmin>
  </div>
  <div class="row" id="grid-top">
    <div class="row" id="topR">
      <div class="col-sm-1" id="full">
        <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/Profile')">VOLVER</button>
      </div>
      <div class="col-sm-11" id="full">
        <span class="title"><b>Cambiar contraseña</b></span>
      </div>
    </div>
    <div class="row" id="bottomR">
      <div class="col-sm-1" id="full">
      </div>
      <div class="col-sm-11" id="full">
        <ChangePasswordForm class="center-form"></ChangePasswordForm>
      </div>
    </div>
  </div>
  <div class="row" id="grid-bottom-home">
    <FooterSocial id="full"></FooterSocial>
  </div>
</div>
</template>

<script>
import ChangePasswordForm from '../components/ChangePasswordForm.vue'
import FooterSocial from '../components/FooterSocialNetwork.vue'
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
    FooterSocial
  }
}
</script>

<style>
</style>
