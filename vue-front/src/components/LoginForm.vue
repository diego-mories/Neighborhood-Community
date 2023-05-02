<template>
<div>
  <template v-if="!houses">
    <b-form @submit.prevent="login">
      <span><img src="../assets/logo.png"></span>
      <b-form-group>
        <div class="input-group mb-3">
          <label class="label-login">Email</label>
          <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
          <b-form-input type="email" class="form-control" placeholder="your-email@gmail.com" v-model="user.email"></b-form-input>
          <label class="label-login">Contraseña</label>
          <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
          <b-form-input type="password" class="form-control" placeholder="Contraseña" v-model="user.password"></b-form-input>
        </div>
          <b-button variant="outline-primary" type="submit">Iniciar sesion</b-button>
          <div class="input-group m-1"><router-link to="/forgotPassword"><label id="forgot-password"><u>¿Recuperar Contraseña?</u></label></router-link></div>
      </b-form-group>
    </b-form>
  </template>
  <template v-if="houses">
    <b-form @submit.prevent="goLogin">
      <span><img src="../assets/logo.png"></span>
      <b-form-group>
        <div class="input-group mb-3 d-flex justify-content-center">
          <label class="label-login">Selecciona planta y piso</label>
          <b-form-select class="ml-3 mr-3 " v-model="selected" :options="optionss"></b-form-select>
        </div>
        <b-button variant="outline-primary" type="submit">Iniciar sesion</b-button>
      </b-form-group>
    </b-form>
  </template>
</div>
</template>

<script>
import Services from '../services/servicesDB'
import swal from 'sweetalert'
export default {
  data: () => ({
    user: {},
    local: {},
    houses: false,
    selected: {},
    optionss: []
  }),
  methods: {
    async login () {
      Services.login(this.user).then(
        Response => {
          // Si la respuesta es OK es true, iniciamos sesion pasando el token a la sesion
          if (Response.data.OK) {
            this.local = Response.data.userLogin
            console.log(Response.data.userLogin)
            if (this.local.role === 4) {
              localStorage.setItem('userLogin', JSON.stringify(this.local))
              this.$router.push({ path: `/login` })
            } else {
              Services.searchCommunity(Response.data.userLogin.id).then(
                Response => {
                  console.log(Response.data)
                  if (Response.data.rowCount.length >= 1) {
                    console.log('Tenemos mas de una casa')
                    this.houses = true
                    this.floors_doors = Response.data.rowCount
                    for (let floorDoor of this.floors_doors) {
                      this.optionss.push({value: {floor: floorDoor.floor, door: floorDoor.door}, text: 'Planta ' + floorDoor.floor + ' Puerta ' + floorDoor.door})
                    }
                    this.local.community_id = Response.data.rowCount[0].community_id
                  } else {
                    this.local.floor = Response.data.rowCount[0].floor
                    this.local.door = Response.data.rowCount[0].door
                    this.local.community_id = Response.data.rowCount[0].community_id
                    localStorage.setItem('userLogin', JSON.stringify(this.local))
                    this.$router.push({ path: `/login` })
                  }
                }
              )
            }
          } else {
            swal({
              title: Response.data.message,
              icon: 'error',
              button: 'OK'
            })
          }
        },
        Error => {
          console.log('Error en el inicio de sesión')
        }
      )
    },
    goLogin () {
      this.local.floor = this.selected.floor
      this.local.door = this.selected.door
      localStorage.setItem('userLogin', JSON.stringify(this.local))
      this.$router.push({ path: `/login` })
    }
  }
}
</script>

<style>
</style>
