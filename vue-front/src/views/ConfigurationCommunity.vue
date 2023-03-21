<template>
  <div class="screen">
    <div class="row" id="grid-top-log">
    </div>
    <div class="row" id="grid-top">
      <div class="row" id="topR">
        <div class="col-sm-12" id="full">
          <span class="title"><b>Configuración comunidad</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-12" id="full">
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
