<template>
<div>
  <b-form>
      <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
      <b-form-group>
          <div class="input-group">
              <label class="label-login">Nombre</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
              <b-form-input
                v-model="newUser.name"
                id="input-newUser-name"
                name="input-newUser-name"
                v-validate="{required: true, alpha: true}"
                class="form-control"
                aria-describedby="input-newUser-name-live-feedback"
                placeholder="Nombre"
                :state="validateState('input-newUser-name')"
              ></b-form-input>
              <b-form-invalid-feedback id="input-newUser-name" class="msgE2">
                {{ veeErrors.first('input-newUser-name')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
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
              <b-form-invalid-feedback id="input-newUser-surname" class="msgE2">
                {{ veeErrors.first('input-newUser-surname')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
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
              <b-form-invalid-feedback id="input-newUser-email" class="msgE2">
                {{ veeErrors.first('input-newUser-email')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
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
              <b-form-invalid-feedback id="input-newUser-phone" class="msgE2">
                {{ veeErrors.first('input-newUser-phone')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
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
              <b-form-invalid-feedback id="input-house" class="msgE">
                {{ veeErrors.first('input-house')?'Elige una opción':'' }}
              </b-form-invalid-feedback>
          </div>
        <b-button class="mt-3" variant="outline-primary" @click.prevent="registerUser()">Registrar</b-button>
      </b-form-group>
    </b-form>
    </div>
</template>
  <!-- <template v-else-if="addHouse && !addHouseOtherC">
    <b-form >
      <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
      <div>
        <b-button class="mt-3" variant="outline-primary" @click.prevent="cancelChangeAddHouse()">Registrar persona sin cuenta existente</b-button>
      </div>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona planta y piso</label>
        <b-form-select class="ml-3 mr-3 " v-model="selected" :options="options"></b-form-select>
      </div>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona el propietario</label>
        <b-form-select class="ml-3 mr-3 " v-model="selected1" :options="options1"></b-form-select>
      </div>
      <b-button class="mt-3" variant="outline-primary" type="submit" @click.prevent="addHouseOwner()">Registrar</b-button>
    </b-form>
  </template> -->

<!-- <b-button v-if="formDoorman" class="mt-3" variant="outline-primary" type="submit">Registrar Portero en comunidad</b-button> -->
<script>
import Services from '../services/servicesDB'

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
      this.newUser.role_id = 3 // Owner por defecto
    },
    // Metodo para buscar la información sobre las puertas y plantas vacias de la comunidad de este presidente:
    searchMyCommunity () {
      Services.searchMyCommunity(this.userLogin.community_id).then(
        Response => {
          this.floors_doors = Response.data.floors_doors
          for (let floorDoor of this.floors_doors) {
            this.options.push({value: {f: floorDoor.floor, d: floorDoor.door}, text: 'Planta ' + floorDoor.floor + ' Puerta ' + floorDoor.door})
          }
        },
        Error => {
          console.log('Error al obtener informacion de los pisos y plantas disponibles')
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
        this.newUser.phone = '+34 ' + this.newUser.phone
        Services.signUp(this.newUser).then(
          Response => {
            this.dfUser.id = Response.data.user_id
            this.dfUser.role_id = 3
            Services.uptadeFD(this.dfUser).then(
              Response => {
                this.$swal.fire({
                icon: 'success',
                title: 'Nuevo propietario registrado en la comunidad',
                text: Error.response.data.message
              }).then(() => {
                this.$router.push({ path: `/login` })
              })
              },
              Error => {
                console.log('Error al dar de alta al nuevo usuario en la comunidad' + this.dfUser.community_id)
              }
            )
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
