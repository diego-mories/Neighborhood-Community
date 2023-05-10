<template>
  <div>
  <b-form  @submit.prevent="changePass">
    <span><img src="../assets/images/password.png" style="width:95px !important;height:105px !important;"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
        <b-form-input type="password" class="form-control" placeholder="Contraseña" v-model="password"></b-form-input>
        <label class="label-login">Repetir contraseña</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
        <b-form-input type="password" class="form-control" placeholder="Contraseña" v-model="passwordRepeat"></b-form-input>
      </div>
        <b-button variant="outline-primary" type="submit">Cambiar contraseña</b-button>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
import Services from '@/services/servicesDB'
import swal from 'sweetalert'
export default {
  data: () => ({
    password: '',
    passwordRepeat: '',
    tokenPass: '',
    userPass: ''
  }),
  methods: {
    changePass () {
      if (this.password !== this.passwordRepeat) {
        swal({
          title: 'Las contraseñas no coinciden',
          icon: 'error',
          button: 'OK'
        })
      } else {
        Services.changePassword(this.tokenPass, this.password, this.userPass).then(
          Response => {
            if (Response.data.OK) {
              swal({
                title: Response.data.message,
                icon: 'success',
                button: 'OK'
              }).then(() => {
                this.$router.push('/login')
              })
            } else {
              swal({
                title: Response.data.message,
                icon: 'error',
                button: 'OK'
              })
            }
          },
          Error => {
            console.log('Error en changePass')
          }
        )
      }
    }
  },
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.tokenPass = dataUserLogin.tokenPass
    this.userPass = dataUserLogin.password
  }

}
</script>

<style>

</style>
