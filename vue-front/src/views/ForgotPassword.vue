<template>
  <div class="container-fluid">
    <b-row class ="py-5 my-5 py-lg-0 my-lg-0">
      <b-col lg="6" class="image-column d-none d-lg-block" :style="{ 'background-image': `url(${imageURL})` }">
      </b-col>
      <b-col lg="6" class="d-flex" >
        <div class="form-container m-auto">
          <ForgotPassword></forgot-password>
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
import ForgotPassword from '../components/forgot-passwordForm.vue';
export default {
  components: {
    FooterSocialNetwork,
    ForgotPassword
  },
  data() {
    return {
      imageURL: require('../assets/images/comunidad.jpg'),
    };
  },
};
</script>

<style>
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

</style>
