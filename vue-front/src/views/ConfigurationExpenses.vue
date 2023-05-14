<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
    <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
  </div>
  <div class="row" id="grid-top">
    <div class="row" id="full">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/Profile')">VOLVER</button>
        </div>
        <div class="col-sm-11" id="full">
            <span class="title"><b>Configuración gastos</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
            <ConfigurationExpensesForm class="center-form"></ConfigurationExpensesForm>
        </div>
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
import ConfigurationExpensesForm from '../components/ConfigurationExpensesForm.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
export default {
  data: () => ({
    role: null
  }),
  components: {
    FooterSocial,
    ConfigurationExpensesForm,
    NavBarPresident,
    NavBarOwner
  },
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = dataUserLogin.role
  }
}
</script>

<style>
</style>
