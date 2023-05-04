<template>
<div>
  <template v-if="!formDoorman && !addHouse">
    <b-form @submit.prevent="registerUser">
        <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
        <div>
          <b-button class="mt-3" variant="outline-primary" @click.prevent="changeAddHouse()">Registrar persona con cuenta existente en otra vivienda</b-button>
        </div>
        <b-form-group>
            <div class="input-group">
                <label class="label-login">Nombre</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Nombre" v-model="newUser.name"></b-form-input>
                <label class="label-login">Apellidos</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Apellidos" v-model="newUser.surname"></b-form-input>
                <label class="label-login">Email</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
                <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com" v-model="newUser.email"></b-form-input>
                <label class="label-login">Teléfono</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon class="mr-1" icon="fa-solid fa-phone" />(+34)</span>
                <b-form-input type="tel" class="form-control" placeholder="XXX-XX-XX-XX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}" v-model="newUser.phone"></b-form-input>
            </div>
        </b-form-group>
        <div class="input-group mb-3 d-flex justify-content-center">
            <label class="label-login">Selecciona planta y piso</label>
            <b-form-select class="ml-3 mr-3 " v-model="selected" :options="options"></b-form-select>
        </div>
        <b-button class="mt-3" variant="outline-primary" type="submit">Registrar</b-button>
    </b-form>
  </template>
  <template v-else-if="formDoorman">
    <b-form  @submit.prevent="registerDoorman">
        <span><img src="../assets/images/doorman.png" class="w-25 h-25 mw-25 mh-25"></span>
        <b-form-group>
            <div class="input-group">
                <label class="label-login">Nombre portero</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Nombre" v-model="newDoorman.name"></b-form-input>
                <label class="label-login">Apellidos portero</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Apellidos" v-model="newDoorman.surname"></b-form-input>
                <label class="label-login">Email portero</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
                <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com" v-model="newDoorman.email"></b-form-input>
            </div>
        </b-form-group>
        <b-button class="mt-3" variant="outline-primary" type="submit">Registrar portero en comunidad</b-button>
    </b-form>
  </template>
  <template v-else-if="addHouse">
    <b-form >
      <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
      <div>
        <b-button class="mt-3" variant="outline-primary" @click.prevent="changeAddHouse()">Registrar persona sin cuenta existente</b-button>
      </div>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona planta y piso</label>
        <b-form-select class="ml-3 mr-3 " v-model="selected" :options="options"></b-form-select>
      </div>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona el propietario</label>
        <b-form-select class="ml-3 mr-3 " v-model="selected1" :options="options1"></b-form-select>
      </div>
      <b-button class="mt-3" variant="outline-primary" type="submit" @click.prevent="addHouseOwner()">Registrar casa al propietario</b-button>
    </b-form>
  </template>

</div>
</template>
<!-- <b-button v-if="formDoorman" class="mt-3" variant="outline-primary" type="submit">Registrar Portero en comunidad</b-button> -->
<script>
import Services from '../services/servicesDB'
export default {
  data () {
    return {
      newUser: {},
      dfUser: {},
      newDoorman: {},
      userLogin: null,
      selected: {},
      options: [],
      selected1: {},
      options1: [],
      formDoorman: false,
      addHouse: false,
      ownersFD: [],
      arrayIds: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.searchMyCommunity()
      this.searchDoorman()
      this.options1 = []
      this.searchOwners()
      this.dfUser.community_id = this.userLogin.community_id
      this.newUser.community_id = this.userLogin.community_id
      this.newUser.role = 3 // Owner por defecto
      this.newDoorman.role = 2
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
    searchOwners () {
      Services.searchOwnersDF(this.userLogin.community_id).then(
        Response => {
          this.ownersFD = Response.data.rowCount
          for (let owner of this.ownersFD) {
            this.arrayIds.push(owner.user_id)
          }
          let copyIds = this.arrayIds.filter((item, index) => {
            return this.arrayIds.indexOf(item) === index
          })
          for (let id of copyIds) {
            Services.findOne(id).then(
              Response => {
                console.log(Response.data.rowCount[0].id)
                this.options1.push(
                  {value: {id: Response.data.rowCount[0].id}, text: Response.data.rowCount[0].name + ' ' + Response.data.rowCount[0].surname + ' (' + Response.data.rowCount[0].email + ')'}
                )
              },
              Error => {
              }
            )
          }
        },
        Error => {
        }
      )
    },
    searchDoorman () {
      Services.searchDoorman(this.userLogin.community_id).then(
        Response => {
          console.log(Response.data.message)
          if (Response.data.exist) {
            this.formDoorman = true
          }
        },
        Error => {
          console.log('Error al obtener informacion del portero')
        }
      )
    },
    registerUser () {
      this.dfUser.myFloor = this.selected.f
      this.dfUser.myDoor = this.selected.d
      this.newUser.phone = '+34 ' + this.newUser.phone
      Services.signUp(this.newUser).then(
        Response => {
          this.dfUser.id = Response.data.user_id
          Services.uptadeFD(this.dfUser).then(
            Response => {
              console.log('OK' + this.dfUser.community_id)
              this.$router.push({ path: `/login` })
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
              text: Error.response.data.message + ' seleccione la opción de alta de una vivienda con una cuenta existente, para asociar una vivienda a un propietario con una o más viviendas en propiedad'
            }).then(() => {
              this.newUser = {}
              this.selected = {}
              this.getData()
            })
          }
        }
      )
    },
    registerDoorman () {
      console.log(this.newDoorman)
      // Services.signUpDoorman(this.newDoorman).then(
      //   Response => {
      //     console.log(Response.data.message)
      //     this.$router.push({ path: `/login` })
      //   },
      //   Error => {
      //     console.log('Errror al registrar nuevo portero en comunidad')
      //   }
      // )
    },
    changeAddHouse () {
      this.addHouse = !this.addHouse
      this.newUser = {}
      this.selected = {}
    },
    addHouseOwner () {
      let data = {
        id: this.selected1.id,
        myFloor: this.selected.f,
        myDoor: this.selected.d,
        community_id: this.userLogin.community_id
      }
      Services.uptadeFD(data).then(
        Response => {
          this.$router.push({ path: `/login` })
        },
        Error => {
          console.log('Error al dar de alta al nuevo usuario en la comunidad' + this.dfUser.community_id)
        }
      )
    }
  }
}
</script>
