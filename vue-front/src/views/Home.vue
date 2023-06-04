<template>
  <div class="container-fluid d-flex flex-column">
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
