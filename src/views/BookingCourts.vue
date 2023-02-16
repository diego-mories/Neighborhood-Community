<template>
  <div class="screen">
    <div class="row" id="grid-top-booking">
      <div class="col-sm-5" id="full">
        <div id="img-container-home"></div>
      </div>
      <div class="col-sm-7" id="full">
        <div class="row" id="title-booking">
          <div class="col-sm-1" id="full">
            <router-link to="/loginOwner"><font-awesome-icon id="back-icon" icon="fa-solid fa-left-long"/></router-link>
          </div>
          <div class="col-sm-11" id="full">
           <span id="title">Reserva de pistas</span>
          </div>
        </div>
        <div class="row" id="courts">
          <div class="col-sm-6" id="full">
            <router-link to="/tennisCourt"><img class="centerImage" src="../assets/images/tennis.png"></router-link>
          </div>
          <div class="col-sm-6" id ="full">
            <router-link to="/paddleCourt"><img class="centerImage" src="../assets/images/paddle.png"></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row" id="grid-bottom-booking">
      <footer-social-network></footer-social-network>
    </div>
  </div>
</template>

<script>
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    FooterSocialNetwork
  }
}
</script>

<style>
#img-container-home{
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/comunidad.jpg');
    background-size: cover;
        -moz-background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
    opacity: 75%;
}
</style>
