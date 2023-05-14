<template>
<div class="screen">
  <div class="row" id="grid-top-home">
    <div class="col-sm-5" id="full">
      <div id="img-container-home"></div>
    </div>
    <div class="col-sm-7" id="full">
      <div class="row" id="topR">
        <div class="col-sm-1" id="full">
          <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/')">VOLVER</button>
        </div>
        <div class="col-sm-11" id="full">
          <span class="title"><b>Recuperar contraseña</b></span>
        </div>
      </div>
      <div class="row" id="bottomR">
        <div class="col-sm-1" id="full">
        </div>
        <div class="col-sm-11" id="full">
          <ForgotPasswordForm class="center-form"></ForgotPasswordForm>
        </div>
        </div>
      </div>
    </div>
  <div class="row" id="grid-bottom-home">
    <FooterSocial id="full"></FooterSocial>
  </div>
</div>
</template>

<script>
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue'
import FooterSocial from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    ForgotPasswordForm,
    FooterSocial
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
