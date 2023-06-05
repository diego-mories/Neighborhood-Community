<template>
    <!-- <div class="screen">
      <div class="row" id="grid-top-log">
          <NavBarPresident id="full"></NavBarPresident>
      </div>
      <div class="row" id="grid-top">
        <div class="row" id="topR">
          <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">VOLVER</button>
          </div>
          <div class="col-sm-11" id="full">
            <span class="title"><b>Derramas</b></span>
          </div>
        </div>
        <div class="row" id="bottomR">
          <div class="col-sm-1" id="full">
          </div>
          <div class="col-sm-11" id="full">
            <SpillsForm class="center-form"></SpillsForm>
          </div>
        </div>
      </div>
      <div class="row" id="grid-bottom-home">
        <FooterSocial id="full"></FooterSocial>
      </div>
    </div> -->
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarPresident></NavBarPresident>
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
        <span class="title"><b>DERRAMAS</b></span>
      </b-col>
    </div>
    <div class="row d-flex mt-5">
      <div>
        <span><img height="185" width="200" src="../assets/images/compra-inmuebles-naranja.png"></span>
      </div>
    </div>
    <div class="row flex-grow-1 d-flex">
        <div class="col-10 col-lg-4 ml-auto mr-auto" style="margin-top: 100px;">
          <SpillsForm></SpillsForm>
        </div>
      </div>
      <div class="row">
        <b-col>
          <FooterSocialNetwork></FooterSocialNetwork>
        </b-col>
      </div>
  </div>
</template>

<script>
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import SpillsForm from '../components/SpillsForm.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
export default {
  components: {
    FooterSocialNetwork,
    SpillsForm,
    NavBarPresident
  }
}
</script>

<style>

</style>
