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
          <span class="title"><b>FACTURAS DE LA COMUNIDAD</b></span>
        </b-col>
      </div>
      <div class="row d-flex mt-5">
        <div>
          <span><img height="185" width="200" src="../assets/images/bill.png"></span>
        </div>
      </div>
      <div class="row flex-grow-1 d-flex">
        <div class="col-10 col-lg-4 ml-auto mr-auto" style="margin-top: 100px;">
          <BillsForm></BillsForm>
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
import BillsForm from '../components/BillsForm.vue'
import NavBarPresident from '../components/NavBarPresident.vue'
export default {
  components: {
    FooterSocialNetwork,
    BillsForm,
    NavBarPresident
  }
}
</script>

<style>

</style>
