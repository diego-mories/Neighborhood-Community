<template>
  <div class="screen">
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">Volver</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Cámaras</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
          CAMARAS DE SEGURIDAD
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

export default {
  components: {
    FooterSocial
  }
}
</script>

<style>
</style>
