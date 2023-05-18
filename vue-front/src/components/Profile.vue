<template>
  <div class="screen" id="full">
    <template v-if="flagConfCom">
      <div class="card p-5 center-form" id="full">
        <div class="row d-flex">
          <div class="col-sm-2 " id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('profile'); flagConfCom = !flagConfCom ; dataComm()">VOLVER</button>
          </div>
          <div class="col-sm-10" id="full"><h4>Reconfiguración de comunidad</h4>
          <img src="../assets/images/perfil.png" class="rounded" id="profileImage"></div></div>
        <div class="row justify-content-center" id="grid-bottom-profile full">
          <div class="input-group mb-3 d-flex justify-content-center"  style="margin-left: 147px;">
            <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.has_paddle_court"/>
            <span class="d-flex align-items-center">¿Hay pista de padel?</span>
            <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.has_tennis_court"/>
            <span class="d-flex align-items-center">¿Hay pista de tenis?</span>
            <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.has_pool"/>
            <span class="d-flex align-items-center">¿Hay piscina?</span>
            <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.has_cameras"/>
            <span class="d-flex align-items-center">¿Hay cámaras?</span>
        </div>
          <div class="col-sm-12" id="full"><button class="btn btn-sm btn-outline-primary" @click.prevent="saveC()" id="profileButton" style="margin-top: 34px; margin-left: 147px;" >GUARDAR CONFIGURACIÓN</button></div>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="profile">
        <div class="card p-5 center-form" id="full">
          <div class="row d-flex">
            <div class="col-sm-2 " id="full">
              <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">VOLVER</button>
            </div>
            <div class="col-sm-10" id="full"><h4>{{name + ' ' + surname}}</h4>
            <img src="../assets/images/perfil.png" class="rounded" id="profileImage"></div></div>
            <div class="row" id="grid-bottom-profile full">
              <div v-if="role_id === 1" class="col">
                <button class="btn btn-sm btn-outline-primary" id="profileButton" @click="$router.push('profile'); flagConfCom = !flagConfCom">RECONFIGURAR CONMUNIDAD</button>
              </div>
              <div v-if="role_id === 1" class="col">
                <button class="btn btn-sm btn-outline-primary" @click="$router.push('changePassword')" id="profileButton">CAMBIAR CONTRASEÑA</button>
              </div>
                <!-- <div class="col-sm-2"></div> -->
              <div v-if="role_id === 3 || role_id === 2 " class="col-sm-12" >
                <button class="btn btn-sm btn-outline-primary" style="margin-left: 147px;" @click="$router.push('changePassword')" id="profileButton">CAMBIAR CONTRASEÑA</button>
              </div>

              <div class="col">
                <button v-if="role_id === 1" class="btn btn-sm btn-outline-success" @click="profile = !profile" id="profileButton">DESIGNAR CARGO</button>
              </div>
              <div v-if="role_id === 1" class="col">
                <button class="btn btn-sm btn-outline-danger" @click="profile = !profile; deleteO = !deleteO ;" id="profileButton">ELIMINAR PROPIETARIO</button>
              </div>
              <div v-if="role_id === 1 && confCommunity.has_building_doorman" class="col">
                <button class="btn btn-sm btn-outline-danger"  @click.prevent="deleteB()" id="profileButton">ELIMINAR PORTERO</button>
              </div>
            <!-- <div v-if="role_id === 1" class="col-2"><button class="btn btn-sm btn-outline-primary" @click="$router.push('changePassword')" id="profileButton">RECONFIGURAR CONMUNIDAD</button></div>
            <div class="col-3" id="full"><button class="btn btn-sm btn-outline-primary" @click="$router.push('changePassword')" id="profileButton">CAMBIAR CONTRASEÑA</button></div>
            <div v-if="role_id === 1" class="col-2" id="full"><button class="btn btn-sm btn-outline-success" @click="profile = !profile" id="profileButton">DESIGNAR CARGO</button></div>
            <div v-if="role_id === 1" class="col-2" id="full"><button class="btn btn-sm btn-outline-danger" @click="profile = !profile; deleteO = !deleteO ;" id="profileButton">ELIMINAR PROPIETARIO</button></div>
            <div v-if="role_id === 1 && confCommunity.has_building_doorman" class="col-sm-2" id="full" @click.prevent="deleteB()"><button class="btn btn-sm btn-outline-danger"  id="profileButton">ELIMINAR PORTERO</button></div> -->
          </div>
        </div>
      </template>
      <template v-else>
        <template v-if="!deleteO">
          <div class="card p-5 center-form" id="full">
            <div class="row d-flex">
              <div class="col-sm-2 " id="full">
                <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('profile'); profile = !profile; selected = null ">VOLVER</button>
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
              <div class="col-sm-5" id="full"><button class="btn btn-sm btn-outline-primary" @click.prevent="changePresident()" id="profileButton" style="margin-top: 34px ;">DESIGNAR CARGO</button></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="card p-5 center-form" id="full">
            <div class="row d-flex">
              <div class="col-sm-2 " id="full">
                <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('profile'); profile = !profile; deleteO = !deleteO; selected1 = null ">VOLVER</button>
              </div>
              <div class="col-sm-10" id="full"><h4>Eliminación de propietario</h4>
              <img src="../assets/images/perfil.png" class="rounded" id="profileImage"></div></div>
            <div class="row justify-content-center" id="grid-bottom-profile full">
              <div class="col-sm-7">
                <label class="label-login">Selecciona planta y piso</label>
                <b-form-select
                v-model="selected1"
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
              </div>
              <div class="col-sm-5" id="full"><button class="btn btn-sm btn-outline-primary" @click.prevent="deleteOwner()" id="profileButton" style="margin-top: 34px ;">ELIMINAR PROPIETARIO</button></div>
            </div>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import servicesDB from '../services/servicesDB'
import Services from '../services/servicesDB'
import CommunityServices from '../services/Community'
export default {
  data () {
    return {
    name: '',
    surname: '',
    role_id: '',
    userLogin: {},
    profile: true,
    selected: null,
    selected1: null,
    deleteO: false,
    options: [],
    floors_doors: [],
    confCommunity: {},
    flagConfCom: false,
    last_tennis: null,
    last_paddle: null
  }   
},
  created () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.dataComm()
    this.name = this.userLogin.name
    this.surname = this.userLogin.surname
    this.role_id = this.userLogin.role_id
    this.searchMyCommunity2()
  },
  methods: {
    dataComm() {
      this.confCommunity = JSON.parse(localStorage.getItem('confCom'))
      this.last_tennis = this.confCommunity.has_tennis_court
      this.last_paddle = this.confCommunity.has_paddle_court
    },
    searchMyCommunity2 () {
      CommunityServices.searchMyCommunity2(this.userLogin.community_id, this.userLogin.floor,this.userLogin.door).then(
        Response => {
          this.floors_doors = Response.data.floors_doors
          for (let floorDoor of this.floors_doors) {
            this.options.push({value: {f: floorDoor.floor, d: floorDoor.door}, text: 'Planta ' + floorDoor.floor + ' Puerta ' + floorDoor.door})
          }
        },
        Error => {
          console.log('Error al obtener informacion de los pisos y plantas ocupadas para la designación')
        }
      )
    },
    changePresident () {
      this.$validator.validateAll(['input-house']).then(result => {
        if (!result) {
          return
        }
        this.$swal.fire({
        title: '¿Seguro de asignar el cargo?',
        showDenyButton: true,
        confirmButtonText: 'CONFIRMAR',
        denyButtonText: `CANCELAR`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
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
                  localStorage.removeItem('userLogin')
                  this.$router.push({ path: '/' })
                })
            }
          },
          Error => {
            console.log('Error en la designación')
          })
          } else if (result.isDenied) {
            this.profile = !this.profile; 
          }
        })
      })
    },  
    deleteOwner() {
      this.$validator.validateAll(['input-house2']).then(result => {
        if (!result) {
          return
        }
          this.$swal.fire({
          title: '¿Seguro de eliminar al propietario de la vivienda?',
          showDenyButton: true,
          confirmButtonText: 'CONFIRMAR',
          denyButtonText: `CANCELAR`,
          }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            var data = {
            community_id: this.userLogin.community_id,
            door: this.selected1.d,
            floor: this.selected1.f
          }
          Services.findAllDebs(data).then(
            Response => {
              if (Response.data.dataResponse.length > 0) {
                this.$swal.fire({
                  icon: 'error',
                  text: 'El propietario tiene deudas, no se puede eliminar de la vivienda'
                }).then(() => {
                  this.$router.push({ path: '/profile' })
                  this.selected1 = null
                  this.$validator.reset()
                })
              } else {
                Services.deleteDP(data).then(
                  Response => {
                    // Services.deleteOHouse(data.floor,data.floor).then()
                    if (Response.status === 200) {
                      this.$swal.fire({
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        title: 'Registros de deudas y pagos eliminados del propietario, desasignando casa...!!'
                      }).then(() => {
                        Services.deleteOH(data).then(
                          Response => {
                            this.$swal.fire({
                              icon: 'success',
                              title: 'Vivienda libre de cargos y de propietario!!',
                              showConfirmButton: false,
                              timer: 2500
                            }).then(()=> {this.$router.push({ path: '/login' })})
                          },
                          Error => {

                          }
                        )
                      })
                    }
                  },
                  Error=> {

                  })
              }
            },
            Error => {
              console.log('Error al buscar datos de deudas')
            })
          } else if (result.isDenied) {
            this.$swal.fire('No se ha eliminado el propietario de la comunidad', '', 'info').then(()=> {
              this.profile = !this.profile 
              this.deleteO = !this.deleteO
            })
          }
        })
      })
    },
    deleteB () {
      this.$swal.fire({
        title: '¿Seguro de eliminar al portero de esta comunidad?',
        showDenyButton: true,
        confirmButtonText: 'CONFIRMAR',
        denyButtonText: `CANCELAR`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Services.deleteDoorman(this.userLogin.community_id).then(
            Response => {
              if (Response.data.vacio) {
                this.$swal.fire({
                  icon: 'error',
                  text: 'La comunidad está configurada con portero, pero no tiene a ninguno registrado aún'
                }).then(() => {
                  this.$router.push({ path: '/profile' })
                })
              } else {
                  this.$swal.fire({
                  icon: 'success',
                  text: 'Portero dado de baja de manera correcta'
                  }).then(() => {
                    this.$router.push({ path: '/login' })
                  })
              }
            },
            Error => {
              console.log('Error al eliminar al portero')
            }
          )
        } else if (result.isDenied) {
          this.$swal.fire('No se ha eliminado el portero de la comunidad', '', 'info')
        }
    })
    },
    saveC () {
      if (this.confCommunity.has_paddle_court) this.confCommunity.has_paddle_court = 1
      else this.confCommunity.has_paddle_court = 0
      if (this.confCommunity.has_tennis_court) this.confCommunity.has_tennis_court = 1
      else this.confCommunity.has_tennis_court = 0
      if (this.confCommunity.has_pool) this.confCommunity.has_pool = 1
      else this.confCommunity.has_pool = 0
      if (this.confCommunity.has_cameras) this.confCommunity.has_cameras = 1
      else this.confCommunity.has_cameras = 0
      console.log('LAST PADDLE:', this.last_paddle)
      console.log('LAST TENIS:', this.last_tennis)
      console.log('Configuracion que dejamos PADEL:', this.confCommunity.has_paddle_court)
      console.log('Configuracion que dejamos TENIS:', this.confCommunity.has_tennis_court)
      if (this.last_paddle === 0 && this.confCommunity.has_paddle_court === 1) {
        servicesDB.createRowsPaddle(this.userLogin.community_id).then(
          Response=> {
            console.log('Añadidas las entradas de las pistas de padel a la tabla ')
          },
          Error => {

          })
      } 
      if (this.last_paddle === 1 && this.confCommunity.has_paddle_court === 0) {
        servicesDB.deleteRowsPaddle(this.userLogin.community_id).then(
          Response=> {
            console.log('Eliminadas las entradas de las pistas de padel a la tabla ')
          },
          Error => {

        })
      }
      if (this.last_tennis === 0 && this.confCommunity.has_tennis_court === 1) {
        servicesDB.createRowsTennis(this.userLogin.community_id).then(
          Response=> {
            console.log('Añadidas las entradas de las pistas de tenis a la tabla ')
          },
          Error => {

          })
      }
      if (this.last_tennis === 1 && this.confCommunity.has_tennis_court === 0) {
        servicesDB.deleteRowsTennis(this.userLogin.community_id).then(
          Response=> {
            console.log('Eliminadas las entradas de las pistas de tenis a la tabla ')
          },
          Error => {

        })
      }
      CommunityServices.updateCommunity(this.userLogin.community_id,this.confCommunity).then(
        Response =>{
          this.$swal.fire({
            icon: 'success',
            text: 'Configuración de comunidad guardada con exito!'
            }).then(() => {
              localStorage.removeItem('confCom')
              localStorage.setItem('confCom', JSON.stringify(this.confCommunity))
              this.$router.push({ path: '/login' })
            })
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
