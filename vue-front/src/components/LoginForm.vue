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
    filterRole (value) {
      if (value === 1) return 'PRESIDENTE'
      if (value === 2) return 'PORTERO'
      if (value === 3) return 'PROPIETARIO'
    },
    async login () {
      Services.login(this.user).then(
        Response => {
          // Si la respuesta es OK es true, iniciamos sesion pasando el token a la sesion
          if (Response.data.OK) {
            this.local = Response.data.userLogin
            if (this.local.is_admin) {
              localStorage.setItem('userLogin', JSON.stringify(this.local))
              this.$router.push({ path: `/login` })
            } else {
              Services.searchCommunity(Response.data.userLogin.id).then(
                Response => {
                  this.houses = true
                  this.floors_doors = Response.data.rowCount
                  for (let floorDoor of this.floors_doors) {
                    // BUSCAR NOMBRE COMUNIDAD
                    Services.searchNameCommunity(floorDoor.community_id).then(
                      Response => {
                        this.optionss.push({value: {floor: floorDoor.floor, door: floorDoor.door, role: floorDoor.role_id, nameC: Response.data.rowCount[0].name, idC: Response.data.rowCount[0].id}, text: 'Planta ' + floorDoor.floor + ' Puerta ' + floorDoor.door + ' (' + this.filterRole(floorDoor.role_id) + ')' + ' COMUNIDAD: ' + Response.data.rowCount[0].name})
                      },
                      Error => { console.log(Error) }
                    )
                  }
                }
              )
              // }
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
          console.log('Error en el inicio de sesión ' + Error)
        }
      )
    },
    goLogin () {
      this.local.community_id = this.selected.idC
      this.local.role_id = this.selected.role
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
