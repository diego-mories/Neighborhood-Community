<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
      <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
      <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    </div>
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">Volver</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Tablón de anuncios</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
          <span><img class="centerImage" src="../assets/images/18-Tablon-de-Anuncios.png"></span>
        </div>
      </div>
    </div>
    <div class="row" id="grid-bottom">
      <footer-social-network></footer-social-network>
    </div>
  </div>
</template>

<script>
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
export default {
  components: {
    FooterSocialNetwork,
    NavBarPresident,
    NavBarOwner
  },
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = dataUserLogin.role
  },
  data () {
    return {
      role: null
    }
  }
}
</script>

<style>
</style>
