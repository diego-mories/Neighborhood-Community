<template>
    <div class="screen">
      <div class="row" id="grid-top-home">
          <div class="col-sm-5" id="full">
            <div id="img-container-home"></div>
          </div>
          <div class="col-sm-7" id="full">
            <div class="center-form">
                <button type="button" class="btn btn-sm btn-primary" v-on:click="ready"> ACTIVAR CUENTA</button>
            </div>
          </div>
      </div>
      <div class="row" id="grid-bottom-home"><FooterSocial id="full"></FooterSocial></div>
    </div>
</template>
<script>
import FooterSocial from '../components/FooterSocialNetwork.vue'
import swal from 'sweetalert'
import Services from '../services/servicesDB'
export default {
  data: () => ({
    tokenActive: ''
  }),
  components: {
    FooterSocial
  },
  methods: {
    ready () {
      this.tokenActive = this.$route.params.tokenActive
      Services.activeUser(this.tokenActive).then(
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
