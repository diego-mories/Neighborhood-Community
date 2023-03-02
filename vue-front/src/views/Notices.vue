<template>
  <div class="screen">
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
