<template>
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
