<template>
<div>
  <template v-if="!formDoorman && !addHouse && !addHouseOtherC ">
    <b-form @submit.prevent="registerUser">
        <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
        <div class="row">
          <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouse()">Registrar vivienda a un usuario existente de esta comunidad</b-button></div>
          <div class="col"><b-button  variant="outline-primary" @click.prevent="changeAddHouseOtherC()">Registrar vivienda a un usuario existente de otra comunidad</b-button></div>
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
  <template v-else-if="addHouse && !addHouseOtherC">
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
  </template>
  <template v-else-if="!addHouse && addHouseOtherC">
    <b-form >
      <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
      <div>
        <b-button class="mt-3" variant="outline-primary" @click.prevent="cancelChangeAddHouseOtherC()">Registrar persona sin cuenta existente</b-button>
      </div>
      <div class="input-group mb-3 d-flex justify-content-center">
        <label class="label-login">Selecciona planta y piso</label>
        <b-form-select class="ml-3 mr-3 " v-model="selected" :options="options"></b-form-select>
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
        <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com" v-model="owner.email"></b-form-input>
      </div>
      <b-button class="mt-3" variant="outline-primary" type="submit" @click.prevent="addHouseOwnerOtherC()">Registrar</b-button>
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
      owner: {},
      newDoorman: {},
      userLogin: null,
      selected: {},
      options: [],
      selected1: {},
      options1: [],
      formDoorman: false,
      addHouse: false,
      addHouseOtherC: false,
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
      this.newUser.role_id = 3 // Owner por defecto
      this.newDoorman.role_id = 2
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
          this.dfUser.role_id = 3
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
              text: Error.response.data.message
            }).then(() => {
              this.newUser = {}
              this.selected = {}
              this.options = []
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
      this.addHouse = true
      this.newUser = {}
      this.selected = {}
    },
    cancelChangeAddHouse () {
      this.addHouse = false
      this.newUser = {}
      this.selected = {}
    },
    changeAddHouseOtherC () {
      this.addHouseOtherC = true
      this.newUser = {}
      this.selected = {}
    },
    cancelChangeAddHouseOtherC () {
      this.addHouseOtherC = false
      this.newUser = {}
      this.selected = {}
    },
    addHouseOwner () {
      console.log(this.newUser)
      this.newUser.role_id = 3 // Owner por defecto
      let data = {
        id: this.selected1.id,
        myFloor: this.selected.f,
        myDoor: this.selected.d,
        role_id: this.newUser.role_id,
        community_id: this.userLogin.community_id
      }
      console.log(data)
      Services.uptadeFD(data).then(
        Response => {
          this.$router.push({ path: `/login` })
        },
        Error => {
          console.log('Error al dar de alta al nuevo usuario en la comunidad' + this.dfUser.community_id)
        }
      )
    },
    addHouseOwnerOtherC () {
      let data = {
        myFloor: this.selected.f,
        myDoor: this.selected.d,
        email: this.owner.email,
        community_id: this.userLogin.community_id,
        role_id: 3
      }
      Services.findOneEmail(data.email).then(
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
                      console.log('Alta de persona en otra comunidad en la nuestra de forma correcta como propietario')
                    },
                    Error => {
                      console.log()
                    }
                  )
                } else {
                  console.log('Existe una persona registrada con este correo en esta comunidad, cambie de formulario')
                }
              },
              Error => {}

            )
          } else {
            console.log('Email no existente en la base de datos')
          }
        },
        Error => {
        }
      )
      // Buscamos el email, si esta entre los usuarios devolvemos el id, con el id buscamos si con el id de la comunidad y id hay alguna cuenta, si es asi, sacamos mensaje de que existe una cuenta en esta comunidad con ese correo, vuelva al formulario de registrar a una persona con cuenta en esta comunidad
      // sino, registramos el id y el role 2, en esta comunidad en doors_floors
    }
  }
}
</script>
