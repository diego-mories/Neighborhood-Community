<template>
<div class="screen">
  <div class="row" id="grid-top-log">
    <NavBarAdmin id="full"></NavBarAdmin>
  </div>
  <div class="row" id="grid-top">
    <div class="row" id="topR">
      <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">VOLVER</button>
      </div>
      <div class="col-sm-11" id="full">
          <span class="title"><b>Nueva Comunidad</b></span>
      </div>
    </div>
    <div class="row" id="bottomR">
      <div class="col-sm-1" id="full">
      </div>
      <div class="col-sm-11" id="full">
        <NewCommunityForm class="center-form"></NewCommunityForm>
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
import NewCommunityForm from '../components/NewCommunityForm.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'

export default {
  components: {
    FooterSocial,
    NewCommunityForm,
    NavBarAdmin
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
