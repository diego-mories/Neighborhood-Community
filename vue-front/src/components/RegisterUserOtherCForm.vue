<template>
  <div>
    <b-form-group>
      <div class="input-group d-flex justify-content-center">
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
      </div>
    </b-form-group>
    <div class="row d-flex flex-grow-1">
      <div class="col-8 m-auto mt-0">
        <b-form-group>
          <b-button class="m-1 custom-button" variant="outline-primary" type="submit" @click.prevent="addHouseOwnerOtherC()">REGISTRAR</b-button>
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
          console.log('Error al obtener informacion de los pisos y plantas disponibles' + Error)
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
            DFServices.searchDFExist(data).then(
              Response => {
                if (Response.data.rowCount.length === 0) {
                  DFServices.uptadeFD(data).then(
                    Response => {
                      this.$swal.fire({
                        icon: 'success',
                        text: 'Alta de persona de otra comunidad en la nuestra de forma correcta como propietario'
                      }).then(() => {
                        console.log('Alta de persona de otra comunidad en la nuestra de forma correcta' + Response)
                        this.$router.push({ path: `/login` })
                      })
                    },
                    Error => {
                      console.log('Fallo en alta de persona de otra comunidad en la nuestra de forma correcta' + Error)
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
              Error => {
                console.log('Fallo al obtener los datos de las casas que existen' + Error)
              }
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
          console.log('Fallo al obtener los datos del usuario a través de su email' + Error)
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