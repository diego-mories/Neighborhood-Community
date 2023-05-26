<template>
    <b-form>
      <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona planta y piso</label>
        <b-form-select
        v-model="selected"
        id="input-house3"
        name="input-house3"
        v-validate="{ required: true}"
        :state="validateState('input-house3')"
        :options="options"
        aria-describedby="input-house3-live-feedback">
        </b-form-select>
        <b-form-invalid-feedback id="input-house3" class="msgE">
        {{ veeErrors.first('input-house3')?'Elige una opción':'' }}
        </b-form-invalid-feedback>
      </div>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona el propietario</label>
        <b-form-select
        v-model="selected1"
        id="input-house4"
        name="input-house4"
        v-validate="{ required: true}"
        :state="validateState('input-house4')"
        :options="options1"
        aria-describedby="input-house4-live-feedback">
        </b-form-select>
        <b-form-invalid-feedback id="input-house4" class="msgE">
        {{ veeErrors.first('input-house4')?'Elige una opción':'' }}
        </b-form-invalid-feedback>
      </div>
      <b-button class="mt-3" variant="outline-primary" type="submit" @click.prevent="addHouseOwner()">REGISTRAR</b-button>
    </b-form>
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
      selected1: null,
      options1: [],
      dfUser: {},
      owner: {},
      ownersFD: [],
      arrayIds: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
        this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
        this.searchMyCommunity()
        this.options1 = []
        this.searchOwners()
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
    searchOwners () {
      CommunityServices.searchOwnersDF(this.userLogin.community_id).then(
        Response => {
          this.ownersFD = Response.data.rowCount
          for (let owner of this.ownersFD) {
            this.arrayIds.push(owner.user_id)
          }
          let copyIds = this.arrayIds.filter((item, index) => {
            return this.arrayIds.indexOf(item) === index
          })
          for (let id of copyIds) {
            UsersServices.findOne(id).then(
              Response => {
                this.options1.push(
                  {value: {id: Response.data.rowCount[0].id}, text: Response.data.rowCount[0].name + ' ' + Response.data.rowCount[0].surname + ' (' + Response.data.rowCount[0].email + ')'}
                )
              },
              Error => {
                console.log('Error en busqueda de datos del usuario a traves de su id' + Error)
              }
            )
          }
        },
        Error => {
          console.log('Error al obtener los datos de los propietarios con casa en la comunidad' + Error)
        }
      )
    },
    addHouseOwner () {
        this.$validator.validateAll(['input-house4','input-house3']).then(result => {
        if (!result) {
          return
        }
          this.newUser.role_id = 3 
          let data = {
              id: this.selected1.id,
              myFloor: this.selected.f,
              myDoor: this.selected.d,
              role_id: this.newUser.role_id,
              community_id: this.userLogin.community_id
          }
          DFServices.uptadeFD(data).then(
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