<template>
  <div>
  <b-form  @submit.prevent="changePass">
    <span><img src="../assets/images/password.png" style="width:95px !important;height:105px !important;"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
        <b-form-input
          v-model="password"
          id="input-password"
          name="input-password"
          v-validate="{ required: true}"
          type="password"
          class="form-control"
          aria-describedby="input-password-live-feedback"
          placeholder="Contraseña"
          :state="validateState('input-password')"
        ></b-form-input>
        <b-form-invalid-feedback id="input-password" class="msgE">
            {{ veeErrors.first('input-password')?'Contraseña no puede estar vacía':'' }}
        </b-form-invalid-feedback>
        <label class="label-login">Repetir contraseña</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
        <b-form-input
          v-model="passwordRepeat"
          id="input-passwordRepeat"
          name="input-passwordRepeat"
          v-validate="{ required: true}"
          type="password"
          class="form-control"
          aria-describedby="input-passwordRepeat-live-feedback"
          placeholder="Repetir contraseña"
          :state="validateState('input-passwordRepeat')"
        ></b-form-input>
        <b-form-invalid-feedback id="input-passwordRepeat" class="msgE">
            {{ veeErrors.first('input-passwordRepeat')?'Contraseña no puede estar vacía':'' }}
        </b-form-invalid-feedback>
      </div>
      <b-button class="m-1 custom-button" variant="outline-primary" type="submit">CABMIAR CONTRASEÑA</b-button>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
import UsersServices from '../services/Users'
import swal from 'sweetalert'
export default {
  data: () => ({
    password: '',
    passwordRepeat: '',
    tokenPass: '',
    userPass: ''
  }),
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.tokenPass = dataUserLogin.tokenPass
    this.userPass = dataUserLogin.password
  },
  methods: {
    changePass () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return 
        }
        if (this.password !== this.passwordRepeat) {
        swal({
          title: 'Las contraseñas no coinciden',
          icon: 'error',
          button: 'OK'
        })
      } else {
        UsersServices.changePassword(this.tokenPass, this.password, this.userPass).then(
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

</style>
