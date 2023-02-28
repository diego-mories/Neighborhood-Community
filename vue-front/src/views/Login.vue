<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <!-- <NavBarPresident id="full"></NavBarPresident> -->
    <!-- <NavBarBuildingDoorman id="full"></NavBarBuildingDoorman> -->
    <!-- <NavBarOwner id="full"></NavBarOwner> -->
    <NavBarAdmin v-if="role === 4" id="full"></NavBarAdmin>
  </div>
  <!-- Vista de Presidente -->
  <div class="row" id="grid-bottom-log">
    <div class="col-6" id="full">
      <img class="centerImage" src="../assets/logo.png">
    </div>
    <div class="col-6" id="full">
      <div class="row" id="graph-top">
      </div>
      <div class="row" id="graph-bottom">
      </div>
    </div>
  </div>
  <!-- Vista de admin -->
  <!--
  <div class="row" id="grid-bottom-log">
    Añadimos tabla con datos de todas las comunidades
  </div> -->
  <!-- Vista de portero -->
  <!--
  <div class="row" id="grid-bottom-log">
    <div class="col-6" id="full">
      <img class="centerImage" src="../assets/logo.png">
    </div>
    <div class="col-6" id="full">
      Calendario para revisar las entregas de los propietarios
    </div>
  </div> -->
  <!-- Vista de propietario -->
  <!-- <div class="row" id="grid-bottom-log">
    <div class="col-6" id="full">
      <img class="centerImage" src="../assets/logo.png">
    </div>
    <div class="col-6" id="full">
      Grafica en medio de este lado actual del propietario
    </div>
  </div> -->
</div>
</template>

<script>
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
import Footer from '../components/FooterSocialNetwork.vue'
export default {
  data: () => ({
    role: 0
  }),
  components: {
    NavBarPresident,
    NavBarOwner,
    NavBarAdmin,
    NavBarBuildingDoorman,
    Footer
  }
}
</script>

<style>
</style>
