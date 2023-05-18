<template>
    <b-form >
      <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona planta y piso</label>
        <b-form-select
        v-model="selected"
        id="input-house2"
        name="input-house2"
        v-validate="{ required: true}"
        :state="validateState('input-house2')"
        :options="options"
        aria-describedby="input-house2-live-feedback">
        </b-form-select>
        <b-form-invalid-feedback id="input-house2" class="msgE">
        {{ veeErrors.first('input-house2')?'Elige una opción':'' }}
        </b-form-invalid-feedback>
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
        <b-form-input
        v-model="owner.email"
        id="input-owner-email"
        name="input-owner-email"
        v-validate="{required: true, email: true}"
        class="form-control"
        aria-describedby="input-owner-email-live-feedback"
        placeholder="Email"
        :state="validateState('input-owner-email')"
        ></b-form-input>
        <b-form-invalid-feedback id="input-owner-email" class="msgE2">
        {{ veeErrors.first('input-owner-email')?'Campo obligatorio':'' }}
        </b-form-invalid-feedback>      
    </div>
      <b-button class="mt-3" variant="outline-primary" type="submit" @click.prevent="addHouseOwnerOtherC()">REGISTRAR</b-button>
    </b-form>
  </template>

<script>
import Services from '../services/servicesDB'
import UsersServices from '../services/Users'
import CommunityServices from '../services/Community'
export default {
  data () {
    return {
      newUser: {},
      userLogin: null,
      selected: null,
      options: [],
      owner: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
       this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
       this.searchMyCommunity()
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
          console.log('Error al obtener informacion de los pisos y plantas disponibles')
        }
      )
    },
    addHouseOwnerOtherC () {
        this.$validator.validateAll(['input-owner-email','input-house2']).then(result => {
        if (!result) {
          return
        }
        let data = {
        myFloor: this.selected.f,
        myDoor: this.selected.d,
        email: this.owner.email,
        community_id: this.userLogin.community_id,
        role_id: 3
      }
      UsersServices.findOneEmail(data.email).then(
        Response => {
          if (Response.data.rowCount.length > 0) {
            data.id = Response.data.rowCount[0].id
            // Buscamos si existe algun usuario con este id en esta misma comunidad
            Services.searchDFExist(data).then(
              Response => {
                if (Response.data.rowCount.length === 0) {
                  // Registramos este id en doors floors en esta misma comunidad.
                  Services.uptadeFD(data).then(
                    Response => {
                      this.$swal.fire({
                        icon: 'success',
                        text: 'Alta de persona de otra comunidad en la nuestra de forma correcta como propietario'
                      }).then(() => {
                        this.$router.push({ path: `/login` })
                      })
                    },
                    Error => {
                    }
                  )
                } else {
                  this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Existe una persona registrada con este correo en esta comunidad, cambie de formulario'
                  }).then(() => {
                    this.owner = {}
                    this.selected = {}
                    this.options = []
                    this.$validator.reset()
                    this.getData()
                  })
                }
              },
              Error => {}

            )
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email no existente en la base de datos, registre un usuario no existente por favor'
            }).then(() => {
              this.owner = {}
              this.selected = {}
              this.options = []
              this.$validator.reset()
              this.getData()
            })
          }
        },
        Error => {
        }
      )
      // Buscamos el email, si esta entre los usuarios devolvemos el id, con el id buscamos si con el id de la comunidad y id hay alguna cuenta, si es asi, sacamos mensaje de que existe una cuenta en esta comunidad con ese correo, vuelva al formulario de registrar a una persona con cuenta en esta comunidad
      // sino, registramos el id y el role 2, en esta comunidad en doors_floors
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