<template>
  <div style="height: 100%;">
    <div class="row" style="height: 95%;">
        <div class="col" id="login-col-L">
          <ColumnaImg></ColumnaImg>
        </div>
        <div class="col" id="login-col-R">
          <LoginForm class="middle-page"></LoginForm>
        </div>
    </div>
    <div class="row" style="height: 5%;"><FooterSocial></FooterSocial></div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import ColumnaImg from '../components/ColumnaImg.vue'
import FooterSocial from '../components/FooterSocialNetwork.vue'
export default {
  components: {
    LoginForm,
    ColumnaImg,
    FooterSocial
  }
}
</script>

<style>

 .middle-page {
      top: 50%;
      left: 50%;
    }
</style>
