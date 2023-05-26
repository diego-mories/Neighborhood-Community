<template>
    <b-form>
        <span><img src="../assets/images/doorman.png" class="w-25 h-25 mw-25 mh-25"></span>
        <b-form-group>
            <div class="input-group">
              <label class="label-login">Nombre portero</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
              <b-form-input
                  v-model="newDoorman.name"
                  id="input-newDoorman-name"
                  name="input-newDoorman-name"
                  v-validate="{required: true, alpha_spaces: true}"
                  class="form-control"
                  aria-describedby="input-newDoorman-name-live-feedback"
                  placeholder="Nombre"
                  :state="validateState('input-newDoorman-name')"
                ></b-form-input>
              <b-form-invalid-feedback id="input-newDoorman-name" class="msgE2">
                {{ veeErrors.first('input-newDoorman-name')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
              <label class="label-login">Apellidos portero</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
              <b-form-input
                v-model="newDoorman.surname"
                id="input-newDoorman-surname"
                name="input-newDoorman-surname"
                v-validate="{required: true, alpha_spaces: true}"
                class="form-control"
                aria-describedby="input-newDoorman-surname-live-feedback"
                placeholder="Apellidos"
                :state="validateState('input-newDoorman-surname')"
              ></b-form-input>
              <b-form-invalid-feedback id="input-newDoorman-surname" class="msgE2">
                {{ veeErrors.first('input-newDoorman-surname')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
              
              <label class="label-login">Email portero</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
              <b-form-input
                v-model="newDoorman.email"
                id="input-newDoorman-email"
                name="input-newDoorman-email"
                v-validate="{required: true, email: true}"
                class="form-control"
                aria-describedby="input-newDoorman-email-live-feedback"
                placeholder="Email"
                :state="validateState('input-newDoorman-email')"
              ></b-form-input>
              <b-form-invalid-feedback id="input-newDoorman-email" class="msgE2">
                {{ veeErrors.first('input-newDoorman-email')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
              <label class="label-login">Teléfono</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon class="mr-1" icon="fa-solid fa-phone" />(+34)</span>
              <b-form-input
                v-model="newDoorman.phone"
                id="input-newDoorman-phone"
                name="input-newDoorman-phone"
                v-validate="{ required: true, digits:9}"
                type="number"
                class="form-control"
                aria-describedby="input-newDoorman-phone-live-feedback"
                placeholder="Teléfono (9 dígitos)"
                :state="validateState('input-newDoorman-phone')"
              ></b-form-input>
              <b-form-invalid-feedback id="input-newDoorman-phone" class="msgE2">
                {{ veeErrors.first('input-newDoorman-phone')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
            </div>
        </b-form-group>
        <b-button class="mt-3" variant="outline-primary" @click="registerDoorman()">REGISTRAR PORTERO</b-button>
    </b-form>
</template>
<script>
import UsersServices from '../services/Users'
import CommunityServices from '../services/Community'
export default {
  data () {
    return {
      newDoorman: {},
      userLogin: null,
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.searchDoorman()
      this.newDoorman.community_id = this.userLogin.community_id
      this.newDoorman.role_id = 2 
    },
    searchDoorman () {
      CommunityServices.searchDoorman(this.userLogin.community_id).then(
        Response => {
          if (Response.data.exist) {
            this.formDoorman = true
          }
        },
        Error => {
          console.log('Error al obtener informacion del portero' + Error)
        }
      )
    },
    registerDoorman () {
      this.$validator.validateAll(['input-newDoorman-name', 'input-newDoorman-surname', 'input-newDoorman-phone', 'input-newDoorman-email']).then(result => {
        if (!result) {
          return
        } 
        UsersServices.signUpDoorman(this.newDoorman).then(
        Response => {
          this.$swal.fire({
            icon: 'success',
            title: 'OK.',
            text: 'Nuevo portero dado de alta en la comunidad correctamente'
          }).then(() => {
            console.log('Nuevo portero dado de alta en la comunidad' + Response)
            this.$router.push({ path: `/login` })
          })
        },
        Error => {
          if (Error.response.status === 404) {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: Error.response.data.message
            }).then(() => {
              this.newDoorman = {}
              this.getData()
            })
          }
        })
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
