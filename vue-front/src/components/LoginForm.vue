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
    // async test () {
    //   console.log('Metodo para comprobar que el correo esta en la base de datos con un usuario registrado')
    //   console.log(this.email)
    //   Services.test(this.email).then(
    //     Response => {
    //       if (Response.status === 200) {
    //         console.log('Ha funcionado el servicio exist')
    //         console.log('¿Hay email? : ' + Response.data.exist)
    //       } else {
    //         console.log('Error en front')
    //       }
    //     },
    //     Error => {
    //       console.log('Ha fallado el test')
    //       console.log(Error.response)
    //     }
    //   )
    // }
    async signIn () {
      console.log('Entramos al sigIn en la vista del front')
      console.log('Enviamos al servicio los datos => email: ' + this.user.email + ' password: ' + this.user.password)
      Services.signIn(this.user).then(
        Response => {
          console.log('RESPUESTA DEL INCIO DE SESION')
          console.log('Respuesta: ' + Response.data.message)
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
