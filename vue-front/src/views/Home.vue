<template>
  <div class="container-fluid">
    <b-row class ="py-5 my-5 py-lg-0 my-lg-0">
      <b-col lg="6" class="image-column d-none d-lg-block" :style="{ 'background-image': `url(${imageURL})` }">
      </b-col>
      <b-col lg="6" class="d-flex" >
        <div class="form-container m-auto">
          <LoginForm></LoginForm>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <FooterSocialNetwork></FooterSocialNetwork>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue';
import LoginForm from '../components/LoginForm.vue';
export default {
  components: {
    FooterSocialNetwork,
    LoginForm
  },
  data() {
    return {
      imageURL: require('../assets/images/comunidad.jpg'),
    };
  },
};
</script>

<style >
.container-fluid {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.image-column {
  background-size: cover;
  background-position: center;
  opacity: 80%;
  height: 95vh;
}

.form-container {
  padding: 20px;
}
/* 
.footer-row {
  width: 100%;
  box-shadow: 0px 9px 31px 0px rgba(140,140,140,1);
  text-shadow: 0.1em 0.1em 0.05em #333;
  color: white;
  align-content: center;
  align-items: center;
  background: rgb(1,30,41);
  background: linear-gradient(222deg, rgba(1,30,41,1) 0%, rgba(83,148,172,1) 100%);
} */

</style>
