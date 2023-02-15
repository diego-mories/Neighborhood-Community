<template>
  <div class="screen">
    <div class="row" id="GridTop">
        <div class="col" id="login-col-L">
          <ColumnaImg></ColumnaImg>
        </div>
        <div class="col" id="login-col-R">
          <LoginForm id="positionForm"></LoginForm>
        </div>
    </div>
    <div class="row" id="GridBottom"><FooterSocial></FooterSocial></div>
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
#login-col-L{
  margin: 0;
  padding: 0;
  max-width: 40%;
}
#login-col-R{
  margin: 0;
  padding: 0;
  max-width: 60%;
  align-items: center;
}
#GridTop{
  height: 95%;
  margin: 0;
  padding: 0;
}

#GridBottom{
  height: 5%;
  margin: 0;
  padding: 0;
}
#positionForm{
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
