<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarPresident v-if="role === 1" id="full"></NavBarPresident>
    <NavBarBuildingDoorman v-if="role === 2" id="full"></NavBarBuildingDoorman>
    <NavBarOwner v-if="role === 3" id="full"></NavBarOwner>
    <NavBarAdmin v-if="role === 4" id="full"></NavBarAdmin>
  </div>
  <!-- Vista de Presidente -->
  <div class="row" id="grid-bottom-log" v-if="role === 1">
    <div class="col-6" id="full">
      <ViewsCardsP></ViewsCardsP>
    </div>
    <div class="col-6" id="full">
      <div class="row" id="graph-top">
      </div>
      <div class="row" id="graph-bottom">
      </div>
    </div>
  </div>
  <!-- Vista de portero -->
  <div class="row" id="grid-bottom-log" v-if="role === 2">
    <div class="col-6" id="full">
      <ViewsCardsB></ViewsCardsB>
    </div>
    <div class="col-6" id="full">
      Calendario para revisar las entregas de los propietarios
    </div>
  </div>
  <!-- Vista de propietario -->
  <div class="row" id="grid-bottom-log" v-if="role === 3">
    <div class="col-6" id="full">
      <ViewsCardsO></ViewsCardsO>
    </div>
    <div class="col-6" id="full">
      Grafica en medio de este lado actual del propietario
    </div>
  </div>
    <!-- Vista de admin -->
  <div class="row" id="grid-bottom-log" v-if="role === 4">
    Añadimos tabla con datos de todas las comunidades
  </div>
  <div class="row" id="grid-bottom">
      <Footer></Footer>
  </div>
</div>
</template>

<script>
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
import Footer from '../components/FooterSocialNetwork.vue'
import ViewsCardsP from '../components/ViewsCardsP.vue'
import ViewsCardsO from '../components/ViewsCardsO.vue'
import ViewsCardsB from '../components/ViewsCardsB.vue'

export default {
  data: () => ({
    role: null
  }),
  components: {
    NavBarPresident,
    NavBarOwner,
    NavBarAdmin,
    NavBarBuildingDoorman,
    ViewsCardsP,
    ViewsCardsO,
    ViewsCardsB,
    Footer
  },
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.role = dataUserLogin.role
  }
}
</script>

<style>
</style>
