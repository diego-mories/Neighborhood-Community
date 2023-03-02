<template>
  <div class="screen">
    <div class="row" id="grid-top">
        <div class="row" id="topR">
          <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">Volver</button>
          </div>
          <div class="col-sm-11" id="full">
           <span class="title"><b>Reserva de pistas</b></span>
          </div>
        </div>
        <div class="row" id="bottomR">
          <div class="col-sm-6" id="full">
            <router-link to="/tennisCourt"><img class="centerImage" src="../assets/images/tennis.png" id="courts"></router-link>
          </div>
          <div class="col-sm-6" id ="full">
            <router-link to="/paddleCourt"><img class="centerImage" src="../assets/images/paddle.png" id="courts"></router-link>
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
export default {
  components: {
    FooterSocialNetwork
  }
}
</script>

<style>
</style>
