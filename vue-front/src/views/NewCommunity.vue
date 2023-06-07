<template>
<!-- <div class="screen">
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
</div> -->
<div class="container-fluid bg-svg d-flex flex-column" style="min-height:1329px">
    <div class="row">
      <NavBarAdmin></NavBarAdmin>
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
        <span class="title"><b>CREACIÓN DE COMUNIDAD</b></span>
      </b-col>
    </div>
    <div class="row d-flex">
      <b-col>
        <span><img height="250" width="250" src="../assets/images/community.png"></span>
      </b-col>
    </div>
    <div class="row flex-grow-1 d-flex">
      <div class="col-8 col-lg-4 m-auto mt-0 mb-5">
        <NewCommunityForm></NewCommunityForm>
      </div>
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
import NewCommunityForm from '../components/NewCommunityForm.vue'
import NavBarAdmin from '../components/NavBarAdmin.vue'

export default {
  components: {
    FooterSocialNetwork,
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
