<template>
<div>
  <b-form>
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1">📧</span>
        <b-form-input type="email" class="form-control" placeholder="your-email@gmail.com" v-model="email"></b-form-input>
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1">🔐</span>
        <b-form-input type="password" class="form-control" placeholder="Contraseña"></b-form-input>
      </div>
        <b-button variant="outline-primary" type="submit" @click="test()">Iniciar sesion</b-button>
        <div class="input-group m-1"><router-link to="/forgotPassword"><label id="forgot-password"><u>¿Recuperar Contraseña?</u></label></router-link></div>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
import Services from '../services/servicesDB'
export default {
  data: () => ({
    email: ''
  }),
  methods: {
    async test () {
      console.log('Metodo para comprobar que el correo esta en la base de datos con un usuario registrado')
      console.log(this.email)
      Services.test(this.email).then(
        Response => {
          if (Response.status === 200) {
            console.log('Ha funcionado el servicio exist')
          } else {
            console.log('Tambien funciona')
          }
        },
        Error => {
          console.log('Ha fallado el test')
          console.log(Error.response)
        }
      )
    }
  }
}
</script>

<style>
</style>
