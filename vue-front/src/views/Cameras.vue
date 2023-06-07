<template>
  <div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarBuildingDoorman></NavBarBuildingDoorman>
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
        <span class="title"><b>CÁMARAS</b></span>
      </b-col>
    </div>
    <div class="row mt-3">
      <b-col>
        <video style="height: 200px; float:right; margin-right: 20px;" controls autoplay loop>
          <source src="../assets/video/Seguridad1.mp4" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
      </b-col>
      <b-col>
        <video style="height: 200px;float:left; margin-left: 16px;" controls autoplay loop>
          <source src="../assets/video/Seguridad2.mp4" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
      </b-col>
    </div>
    <div class="row mt-3">
      <b-col>
        <video style="height: 200px; float:right; margin-right: 20px;" controls autoplay loop>
          <source src="../assets/video/Seguridad2.mp4" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
      </b-col>
      <b-col>
        <video style="height: 200px;float:left; margin-left: 16px;" controls autoplay loop>
          <source src="../assets/video/Seguridad1.mp4" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
      </b-col>
    </div>
    <div class="row mt-3 flex-grow-1 d-flex mb-5">
      <b-col>
        <video style="height: 200px; float:right; margin-right: 20px;" controls autoplay loop>
          <source src="../assets/video/Seguridad1.mp4" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
      </b-col>
      <b-col>
        <video style="height: 200px;float:left; margin-left: 16px;" controls autoplay loop>
          <source src="../assets/video/Seguridad2.mp4" type="video/mp4">
          Tu navegador no admite la reproducción de videos.
        </video>
      </b-col>
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
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
export default {
  components: {
    FooterSocialNetwork,
    NavBarBuildingDoorman
  }
}
</script>

<style>
</style>
