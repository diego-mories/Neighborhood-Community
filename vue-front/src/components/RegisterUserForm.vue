<template>
  <div>
    <div class="input-group d-flex justify-content-center">
      <b-form-group>
        <div class="input-group">
            <label class="label-login">Nombre</label>
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
            <b-form-input
              v-model="newUser.name"
              id="input-newUser-name"
              name="input-newUser-name"
              v-validate="{required: true, alpha_spaces: true}"
              class="form-control"
              aria-describedby="input-newUser-name-live-feedback"
              placeholder="Nombre"
              :state="validateState('input-newUser-name')"
            ></b-form-input>
            <label class="label-login">Apellidos</label>
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
            <b-form-input
              v-model="newUser.surname"
              id="input-newUser-surname"
              name="input-newUser-surname"
              v-validate="{required: true, alpha_spaces: true}"
              class="form-control"
              aria-describedby="input-newUser-surname-live-feedback"
              placeholder="Apellidos"
              :state="validateState('input-newUser-surname')"
            ></b-form-input>
            <label class="label-login">Email</label>
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
            <b-form-input
              v-model="newUser.email"
              id="input-newUser-email"
              name="input-newUser-email"
              v-validate="{required: true, email: true}"
              class="form-control"
              aria-describedby="input-newUser-email-live-feedback"
              placeholder="Email"
              :state="validateState('input-newUser-email')"
            ></b-form-input>
            <label class="label-login">Teléfono</label>
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon class="mr-1" icon="fa-solid fa-phone" />(+34)</span>
            <b-form-input
              v-model="newUser.phone"
              id="input-newUser-phone"
              name="input-newUser-phone"
              v-validate="{ required: true, digits:9}"
              type="number"
              class="form-control"
              aria-describedby="input-newUser-phone-live-feedback"
              placeholder="Teléfono (9 dígitos)"
              :state="validateState('input-newUser-phone')"
            ></b-form-input>
            <label class="label-login">Selecciona planta y piso</label>
            <b-form-select
              v-model="selected"
              id="input-house"
              name="input-house"
              v-validate="{ required: true}"
              :state="validateState('input-house')"
              :options="options"
              aria-describedby="input-house-live-feedback">
            </b-form-select>
        </div>
      </b-form-group>
    </div>
    <div class="row d-flex flex-grow-1">
      <div class="col-8 m-auto mt-0">
        <b-form-group>
          <b-button class="m-1 custom-button" variant="outline-primary" @click.prevent="registerUser()">REGISTRAR</b-button>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
import UsersServices from '../services/Users'
import CommunityServices from '../services/Community'
import DFServices from '../services/Doors_floors'
export default {
  data () {
    return {
      newUser: {},
      userLogin: null,
      selected: null,
      options: [],
      dfUser: {},
    }
  },

  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.searchMyCommunity()
      this.dfUser.community_id = this.userLogin.community_id
      this.newUser.community_id = this.userLogin.community_id
      this.newUser.role_id = 3 
    },
    searchMyCommunity () {
      CommunityServices.searchMyCommunity(this.userLogin.community_id).then(
        Response => {
          this.floors_doors = Response.data.floors_doors
          for (let floorDoor of this.floors_doors) {
            this.options.push({value: {f: floorDoor.floor, d: floorDoor.door}, text: 'Planta ' + floorDoor.floor + ' Puerta ' + floorDoor.door})
          }
        },
        Error => {
          console.log('Error al obtener informacion de los pisos y plantas disponibles' + Error)
        }
      )
    },
    registerUser () {
      this.$validator.validateAll(['input-newUser-name','input-newUser-surname','input-newUser-email','input-newUser-phone','input-house']).then(result => {
        if (!result) {
          return
        }
        this.dfUser.myFloor = this.selected.f
        this.dfUser.myDoor = this.selected.d
        this.newUser.phone = this.newUser.phone
        UsersServices.signUp(this.newUser).then(
          Response => {
            if (Response.status === 200) {
              this.dfUser.id = Response.data.user_id
              this.dfUser.role_id = 3
              DFServices.uptadeFD(this.dfUser).then(
                Response => {
                  if (Response.status === 200 || Response.status === 204) {
                    this.$swal.fire({
                    icon: 'success',
                    title: 'Nuevo propietario registrado en la comunidad',
                    }).then(() => {
                    this.$router.push({ path: `/login` })
                  })
                  }
                },
                Error => {
                  console.log('Error al dar de alta al nuevo usuario en la comunidad' + this.dfUser.community_id + Error)
                }
              )
            }
            
          },
          Error => {
            if (Error.response.status === 404) {
              this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: Error.response.data.message
              }).then(() => {
                this.newUser = {}
                this.selected = {}
                this.options = []
                this.$validator.reset()
                this.getData()
              })
            }
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
