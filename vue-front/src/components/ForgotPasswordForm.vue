<template>
<div>
  <b-form @submit.prevent="resetPassword">
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-5">
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
        <b-form-input
              v-model="email"
              id="input-email"
              name="input-email"
              v-validate="{ required: true, email: true}"
              type="email"
              style="max-width: 275px;"
              aria-describedby="input-email-live-feedback"
              placeholder="your-email@"
              :state="validateState('input-email')"
            ></b-form-input>
            <b-form-invalid-feedback id="input-email" class="msgE2">
                {{ veeErrors.first('input-email')?'Introduce un email válido':'' }}
            </b-form-invalid-feedback>
      </div>
        <b-button variant="outline-primary" type="submit">RECUPERAR CONTRASEÑA</b-button>
    </b-form-group>
    <div class="input-group m-1"><router-link id="forgot-password" to="/"><label><u>Volver a iniciar sesión</u></label></router-link></div>
  </b-form>
</div>
</template>

<script>
import UsersServices from '../services/Users'
import swal from 'sweetalert'
export default {
  data: () => ({
    email: ''
  }),
  methods: {
    async resetPassword () {
      this.$validator.validateAll(['input-email']).then(result => {
        if (!result) {
          return 
        }
        UsersServices.resetPassword(this.email).then(
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
              }).then(() => {
                this.$router.push('/')
              })
            }
          },
          Error => {
            console.log(Error.response)
          }
        )
      })
    },
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    }
    
  }
}
</script>

<style>
#forgot-password:hover{
  cursor:pointer;
}
#forgot-password{
  margin:auto
}
.msgE2{
  display: none !important;
  margin-top: 0%;
}
</style>
