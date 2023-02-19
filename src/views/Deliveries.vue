<template>
  <div class="screen">
    <div class="row" id="grid-top">
      <div class="col-sm-5" id="full">
        <div id="img-container-home">
        </div>
      </div>
      <div class="col-sm-7" id="full">
        <div class="row" id="topR">
          <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('loginPresident')">Volver</button>
          </div>
          <div class="col-sm-1" id="full">
          </div>
          <div class="col-sm-10" id="full">
            <span class="title"><b>Entregas</b></span>
          </div>
        </div>
        <div class="row" id="bottomR-middle">
          <div class="col-sm-3" id="full">
          </div>
          <div class="col-sm-8" id="full">
            <b-calendar block></b-calendar>
          </div>
          <div class="col-sm-1" id="full">
          </div>
        </div>
        <div class="row" id="bottomR-bottom">
          <div class="col-sm-3" id="full">
          </div>
          <div class="col-sm-3" id="full">
            <input type="checkbox" v-model="anyHour" name="anyHour"/>
            <label for="anyHour">Cualquier hora</label>
            <b-time locale="en" @context="onContext" for="checkbox-1" :disabled="anyHour"></b-time>
          </div>
          <div class="col-sm-6" id="full">
            <b-button variant="outline-primary" type="submit">Añadir</b-button>
          </div>
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
  },
  data () {
    return {
      anyHour: false
    }
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
