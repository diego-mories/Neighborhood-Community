<template>
<div>
  <b-form @submit.prevent="resetPassword">
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
        <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com" v-model="email"></b-form-input>
      </div>
        <b-button variant="outline-primary" type="submit">Recuperar contraseña</b-button>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
import Services from '../services/servicesDB'
import swal from 'sweetalert'
export default {
  data: () => ({
    email: ''
  }),
  methods: {
    async resetPassword () {
      console.log(this.email)
      Services.resetPassword(this.email).then(
        Response => {
          if (Response.status === 200 && Response.data.exist === false) {
            swal({
              title: Response.data.message,
              icon: 'error',
              button: 'OK'
            })
          } else {
            swal({
              title: Response.data.message,
              icon: 'success',
              button: 'OK'
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

</style>
