<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
      <NavBarBuildingDoorman id="full"></NavBarBuildingDoorman>
    </div>
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">VOLVER</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Cámaras</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
          <div class="row">
            <div class="col-sm-12" id="full">
              <a href="https://www.skylinewebcams.com/es/webcam/espana/canarias/santa-cruz-de-tenerife/catamarano-royal-delfin.html" target="_blank"><img src="https://embed.skylinewebcams.com/img/670.jpg" alt="【LIVE】 Catamarán Royal Delfin - Tenerife | SkylineWebcams"></a>         
              <a href="https://www.skylinewebcams.com/es/webcam/espana/canarias/santa-cruz-de-tenerife/punta-brava.html" target="_blank"><img src="https://embed.skylinewebcams.com/img/1276.jpg" alt="【LIVE】 Puerto de la Cruz - Punta Brava | SkylineWebcams"></a>        
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12" id="full">
              <a href="https://www.skylinewebcams.com/es/webcam/espana/comunidad-valenciana/alicante/benidorm-playa-alicante.html" target="_blank"><img src="https://embed.skylinewebcams.com/img/592.jpg" alt="【LIVE】 Benidorm - Playa de Levante - Alicante | SkylineWebcams"></a>
              <a href="https://www.skylinewebcams.com/es/webcam/espana/cataluna/gerona/lloret-de-mar-costa-brava.html" target="_blank"><img src="https://embed.skylinewebcams.com/img/631.jpg" alt="【LIVE】 Lloret De Mar | SkylineWebcams"></a>                     
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-sm-12" id="full">
              <a href="https://www.skylinewebcams.com/es/webcam/espana/cataluna/barcelona/catamaran.html" target="_blank"><img src="https://embed.skylinewebcams.com/img/3759.jpg" alt="【LIVE】 Tour en Catamarán Tur Tur - Port Olímpic | SkylineWebcams"></a>         
              <a href="https://www.skylinewebcams.com/es/webcam/kenya/taita-taveta-county/voi/tsavo-east-national-park.html" target="_blank"><img src="https://embed.skylinewebcams.com/img/992.jpg" alt="【LIVE】 Kenia - Tsavo East National Park | SkylineWebcams"></a>        
            </div>
          </div> -->
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
import NavBarBuildingDoorman from '../components/NavBarBuildingDoorman.vue'
export default {
  components: {
    FooterSocial,
    NavBarBuildingDoorman
  }
}
</script>

<style>
</style>
