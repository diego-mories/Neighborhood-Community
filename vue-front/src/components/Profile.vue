<template>
  <div class="screen" id="full">
    <template v-if="profile">
      <div class="card p-5 center-form" id="full">
        <div class="row d-flex">
          <div class="col-sm-2 " id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">Volver</button>
          </div>
          <div class="col-sm-10" id="full"><h4>{{name + ' ' + surname}}</h4>
          <img src="../assets/images/perfil.png" class="rounded" id="profileImage"></div></div>
        <div class="row justify-content-center" id="grid-bottom-profile full">
          <div class="col-sm-2"></div>
          <div class="col-sm-5" id="full"><button class="btn btn-sm btn-outline-primary" @click="$router.push('changePassword')" id="profileButton">Cambiar contraseña</button></div>
          <div v-if="role_id === 1" class="col-sm-5" id="full"><button class="btn btn-sm btn-outline-primary" @click="profile = !profile" id="profileButton">Designar cargo en otra vivienda</button></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="card p-5 center-form" id="full">
        <div class="row d-flex">
          <div class="col-sm-2 " id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('profile'); profile = !profile">Volver</button>
          </div>
          <div class="col-sm-10" id="full"><h4>Designación de presidente</h4>
          <img src="../assets/images/perfil.png" class="rounded" id="profileImage"></div></div>
        <div class="row justify-content-center" id="grid-bottom-profile full">
          <div class="col-sm-7">
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
          <div class="col-sm-5" id="full"><button class="btn btn-sm btn-outline-primary" @click.prevent="changePresident()" id="profileButton" style="margin-top: 34px ;">Confirmar designar cambio</button></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Services from '../services/servicesDB'

export default {
  data () {
    return {
    name: '',
    surname: '',
    role_id: '',
    userLogin: {},
    profile: true,
    selected: null,
    options: [],
    floors_doors: []

  }   
},
  created () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.name = this.userLogin.name
    this.surname = this.userLogin.surname
    this.role_id = this.userLogin.role_id
    this.searchMyCommunity2()
  },
  methods: {
    searchMyCommunity2 () {
      console.log(this.userLogin.community_id)
      Services.searchMyCommunity2(this.userLogin.community_id, this.userLogin.floor,this.userLogin.door).then(
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
    changePresident () {
      console.log(this.userLogin)
      console.log(this.selected)
      let data = {
        floorNew: this.selected.f,
        doorNew: this.selected.d,
        floorP: this.userLogin.floor,
        doorP: this.userLogin.door
      }
      Services.updatePresident(data).then(
        Response => {
          if (Response.status === 200) {
            this.$swal.fire({
              icon: 'success',
              text: 'Sucesión realizada de forma correcta'
            }).then(() => {
              this.$router.push({ path: '/' })
              localStorage.removeItem('userLogin')
              history.pushState(null, null, location.href)
              history.back()
              history.forward()
              window.onpopstate = function () { history.go(1) }
            })
          }
        },
        Error => {

        }
      )
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
#profileImage{
    margin: 8%;
    width: 25%;
}
</style>
