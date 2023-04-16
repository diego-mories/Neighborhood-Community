<template>
<div>
  <b-form @submit.prevent="login">
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
        <b-form-input type="email" class="form-control" placeholder="your-email@gmail.com" v-model="user.email"></b-form-input>
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
        <b-form-input type="password" class="form-control" placeholder="Contraseña" v-model="user.password"></b-form-input>
      </div>
        <b-button variant="outline-primary" type="submit">Iniciar sesion</b-button>
        <div class="input-group m-1"><router-link to="/forgotPassword"><label id="forgot-password"><u>¿Recuperar Contraseña?</u></label></router-link></div>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
import Services from '../services/servicesDB'
import swal from 'sweetalert'
export default {
  data: () => ({
    user: {}
  }),
  methods: {
    async login () {
      Services.login(this.user).then(
        Response => {
          // Si la respuesta es OK es true, iniciamos sesion pasando el token a la sesion
          if (Response.data.OK) {
            localStorage.setItem('userLogin', JSON.stringify(Response.data.userLogin))
            // Mandar a la vista tal cual la url
            if (Response.data.userLogin.first_time === 1 && Response.data.userLogin.role === 1) {
              this.$router.push({ path: `/configurationCommunity` })
            } else {
              this.$router.push({ path: `/login` })
            }
          } else {
            swal({
              title: Response.data.message,
              icon: 'error',
              button: 'OK'
            })
          }
        },
        Error => {
          console.log('Error en el inicio de sesión')
        }
      )
    }
  }
}
</script>

<style>
</style>
