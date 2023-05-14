<template>
<div class="screen" id="full">
  <div class="row" id="grid-top-log">
    <NavBarPresident></NavBarPresident>
  </div>
  <div class="row" id="grid-top">
    <div class="row" id="topR">
      <div class="col-sm-1" id="full">
        <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">Volver</button>
      </div>
      <div class="col-sm-11" id="full">
        <span class="title"><b>Cuentas de la comunidad</b></span>
      </div>
    </div>
    <div class="row" id="bottomR">
      <div class="col-sm-1" id="full">
      </div>
      <div class="col-sm-11" id="full">
        <BillsForm class="center-form"></BillsForm>
      </div>
    </div>
  </div>
  <div class="row" id="grid-bottom-home">
    <FooterSocial id="full"></FooterSocial>
  </div>
</div>
</template>

<script>
import FooterSocial from '../components/FooterSocialNetwork.vue'
import BillsForm from '../components/BillsForm.vue'
// import NavBarPresident from '../components/NavBarPresident.vue'
export default {
  components: {
    FooterSocial,
    BillsForm,
   },
  // data: () => ({
  //   role: null,
  //   userLogin: {},
  // }),
  // created () {
  //   this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
  //   this.role = this.userLogin.role_id
  // }
}
</script>

<style>

</style>
