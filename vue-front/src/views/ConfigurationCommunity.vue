<template>
  <div class="screen">
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/Profile')">Volver</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Configuración comunidad</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
          <ConfigurationCommunityForm class="center-form"></ConfigurationCommunityForm>
        </div>
      </div>
    </div>
    <div class="row" id="grid-bottom">
      <FooterSocial id="full"></FooterSocial>
    </div>
  </div>
</template>
<script>

import FooterSocial from '../components/FooterSocialNetwork.vue'
import ConfigurationCommunityForm from '../components/ConfigurationCommunityForm.vue'
export default {
  components: {
    FooterSocial,
    ConfigurationCommunityForm
  }
}
</script>

<style>
</style>
