<template>
    <b-form  @submit.prevent="registerDoormanOtherC">
        <span><img src="../assets/images/doorman.png" class="w-25 h-25 mw-25 mh-25"></span>
        <b-form-group>
            <div class="input-group">
              <label class="label-login">Email portero</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
              <b-form-input
                v-model="newDoorman.email"
                id="input-newDoorman-email2"
                name="input-newDoorman-email2"
                v-validate="{required: true, email: true}"
                class="form-control"
                aria-describedby="input-newDoorman-email2-live-feedback"
                placeholder="Email"
                :state="validateState('input-newDoorman-email2')"
              ></b-form-input>
              <b-form-invalid-feedback id="input-newDoorman-emai2l" class="msgE2">
                {{ veeErrors.first('input-newDoorman-email2')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
            </div>
        </b-form-group>
        <b-button class="mt-3" variant="outline-primary" type="submit">REGISTRAR PORTERO</b-button>
    </b-form>
</template>
<script>
import UsersServices from '../services/Users'
import DFServices from '../services/Doors_floors'
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
      this.newDoorman.community_id = this.userLogin.community_id
      this.newDoorman.role_id = 2 
    },
    registerDoormanOtherC () {
        this.$validator.validateAll(['input-newDoorman-email2']).then(result => {
        if (!result) {
          return
        } 
        UsersServices.findOneEmail(this.newDoorman.email).then(
        Response => {
          if (Response.data.rowCount.length > 0) {
            let data = {
              id: Response.data.rowCount[0].id,
              community_id: this.newDoorman.community_id,
              role_id: this.newDoorman.role_id
            }
            DFServices.updateFDDoorman(data).then(
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
                    text: 'Fallo en el registro del portero con una cuenta existente'
                  }).then(() => {
                    this.newDoorman = {}
                    this.getData()
                  })
                }
              }
            )
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email no existente en la base de datos, registre un usuario no existente por favor para el nuevo portero de la comunidad'
            })
          }
        },
        Error => {
          console.log('Error buscando los datos del usuario a traves del email ' + Error)
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