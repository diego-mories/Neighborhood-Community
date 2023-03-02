<template>
<div>
  <b-form @submit.prevent="signIn">
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1">📧</span>
        <b-form-input type="email" class="form-control" placeholder="your-email@gmail.com" v-model="user.email"></b-form-input>
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1">🔐</span>
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
export default {
  data: () => ({
    user: {}
  }),
  methods: {
    async signIn () {
      Services.signIn(this.user).then(
        Response => {
          console.log('RESPUESTA DEL INCIO DE SESION')
          // Si la respuesta es OK es true, iniciamos sesion pasando el token a la sesion
          if (Response.data.OK) {
            console.log(Response.data.message)
            localStorage.setItem('userLogin', JSON.stringify(Response.data.userLogin))
            // Mandar a la vista tal cual la url
            this.$router.push({ path: `/login` })
          } else {
            console.log(Response.data.message)
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
