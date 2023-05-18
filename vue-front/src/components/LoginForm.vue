<template>
<div>
  <template v-if="!houses">
    <b-form @submit.prevent="login">
      <span><img src="../assets/logo.png"></span>
      <b-form-group>
        <div class="input-group mb-3">
          <label class="label-login">Email</label>
          <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
          <b-form-input
              v-model="user.email"
              id="input-user-email"
              name="input-user-email"
              v-validate="{ required: true, email: true}"
              type="email"
              class="form-control"
              aria-describedby="input-user-email-live-feedback"
              placeholder="your-email@"
              :state="validateState('input-user-email')"
          ></b-form-input>
          <b-form-invalid-feedback id="input-user-email" class="msgE">
            {{ veeErrors.first('input-user-email')?'Introduce un email válido':'' }}
          </b-form-invalid-feedback>
          <label class="label-login">Contraseña</label>
          <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-key" /></span>
          <b-form-input
              v-model="user.password"
              id="input-user-password"
              name="input-user-password"
              v-validate="{ required: true}"
              type="password"
              class="form-control"
              aria-describedby="input-user-password-live-feedback"
              placeholder="Contraseña"
              :state="validateState('input-user-password')"
            ></b-form-input>
            <b-form-invalid-feedback id="input-user-password" class="msgE">
                {{ veeErrors.first('input-user-password')?'Contraseña no puede estar vacía':'' }}
            </b-form-invalid-feedback>
        </div>
          <b-button variant="outline-primary" type="submit">INICIAR SESIÓN</b-button>
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
          <b-form-select
              class="ml-3 mr-3 "
              v-model="selected"
              id="input-house"
              name="input-house"
              v-validate="{ required: true}"
              :state="validateState('input-house')"
              :options="optionss"
              aria-describedby="input-house-live-feedback">
          </b-form-select>
          <b-form-invalid-feedback id="input-house" class="msgE">
                {{ veeErrors.first('input-house')?'Elige una opción':'' }}
          </b-form-invalid-feedback>
        </div>
        <b-button variant="outline-primary" type="submit">INICIAR SESIÓN</b-button>
      </b-form-group>
    </b-form>
  </template>
</div>
</template>

<script>
import CommunityServices from '../services/Community'
import UsersServices from '../services/Users'
import swal from 'sweetalert'
export default {
  data: () => ({
    user: {},
    local: {},
    localCommunity: {},
    houses: false,
    selected: null,
    optionss: [],
  }),

  methods: {
    filterRole (value) {
      if (value === 1) return 'PRESIDENTE'
      if (value === 2) return 'PORTERO'
      if (value === 3) return 'PROPIETARIO'
    },
    async login () {
      this.$validator.validateAll(['input-user-password', 'input-user-email']).then(result => {
        if (!result) {
          return
        } else {
          UsersServices.login(this.user).then(
            Response => {
              if (Response.data.OK) {
                this.local = Response.data.userLogin
                if (this.local.is_admin) {
                  localStorage.setItem('userLogin', JSON.stringify(this.local))
                  this.$router.push({ path: `/login` })
                } else {
                  CommunityServices.searchCommunity(Response.data.userLogin.id).then(
                    Response => {
                      this.houses = true
                      this.floors_doors = Response.data.rowCount
                      for (let floorDoor of this.floors_doors) {
                        CommunityServices.searchNameCommunity(floorDoor.community_id).then(
                          Response => {
                            this.optionss.push({value: {floor: floorDoor.floor, door: floorDoor.door, role: floorDoor.role_id, nameC: Response.data.rowCount[0].name, idC: Response.data.rowCount[0].id, has_paddle_court: Response.data.rowCount[0].has_paddle_court, has_paddle_court: Response.data.rowCount[0].has_paddle_court, has_tennis_court: Response.data.rowCount[0].has_tennis_court, has_building_doorman: Response.data.rowCount[0].has_building_doorman,has_pool: Response.data.rowCount[0].has_pool, has_cameras: Response.data.rowCount[0].has_cameras, nameC: Response.data.rowCount[0].name}, text: 'Planta ' + floorDoor.floor + ' Puerta ' + floorDoor.door + ' (' + this.filterRole(floorDoor.role_id) + ')' + ' COMUNIDAD: ' + Response.data.rowCount[0].name})
                          },
                          Error => { console.log(Error) }
                        )
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
              console.log('Error en el inicio de sesión ' + Error)
            }
          )
        }
      })
    },
    goLogin () {
      this.$validator.validateAll(['input-house']).then(result => {
        if (!result) {
          return 
        } else {
          this.local.community_id = this.selected.idC
          this.local.role_id = this.selected.role
          this.local.floor = this.selected.floor
          this.local.door = this.selected.door
          this.localCommunity.has_building_doorman = this.selected.has_building_doorman
          this.localCommunity.has_cameras = this.selected.has_cameras
          this.localCommunity.has_paddle_court = this.selected.has_paddle_court
          this.localCommunity.has_pool = this.selected.has_pool
          this.localCommunity.has_tennis_court = this.selected.has_tennis_court
          this.localCommunity.name = this.selected.nameC
          localStorage.setItem('userLogin', JSON.stringify(this.local))
          localStorage.setItem('confCom', JSON.stringify(this.localCommunity))
          this.$router.push({ path: `/login` })
        }
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

<style>
</style>
