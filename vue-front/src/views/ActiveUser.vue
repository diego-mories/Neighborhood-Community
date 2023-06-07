<template>
  <div class="container-fluid d-flex flex-column">
    <b-row class ="py-5 my-5 py-lg-0 my-lg-0">
      <b-col lg="6" class="image-column d-none d-lg-block" :style="{ 'background-image': `url(${imageURL})` }">
      </b-col>
      <b-col lg="6" class="d-flex" >
        <div class="form-container m-auto">
          <button type="button" class="btn btn-sm btn-primary" v-on:click="ready"> ACTIVAR CUENTA</button>
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
import FooterSocialNetwork from '../components/FooterSocialNetwork.vue'
import swal from 'sweetalert'
import UsersServices from '../services/Users'
export default {
  data: () => ({
    tokenActive: ''
  }),
  components: {
    FooterSocialNetwork
  },
  methods: {
    ready () {
      this.tokenActive = this.$route.params.tokenActive
      UsersServices.activeUser(this.tokenActive).then(
        Response => {
          if (Response.status === 200 && Response.data.active === false) {
            swal({
              title: Response.data.message,
              icon: 'success',
              button: 'OK'
            }).then(() => {
              this.$router.push({ path: '/' })
            })
          } else {
            swal({
              title: Response.data.message,
              icon: 'error',
              button: 'OK'
            }).then(() => {
              this.$router.push({ path: '/' })
            })
          }
        },
        Error => {
          console.log(Error.response)
        }
      )
    }
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
