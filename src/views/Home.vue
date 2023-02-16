<template>
  <div class="screen">
    <div class="row" id="grid-top-home">
        <div class="col-sm-5" id="full">
          <div id="img-container-home"></div>
        </div>
        <div class="col-sm-7" id="col-R-home">
          <LoginForm id="position-form-home"></LoginForm>
        </div>
    </div>
    <div class="row" id="grid-bottom-home"><FooterSocial id="full"></FooterSocial></div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import FooterSocial from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    LoginForm,
    FooterSocial
  }
}
</script>

<style>
/* Extra */
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
