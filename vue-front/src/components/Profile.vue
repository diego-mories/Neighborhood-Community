<template>
    <b-card class="profile-card m-auto">
    <template v-if="!flagConfCom">
      <div class="row">
        <div class="col-2">
          <font-awesome-icon icon="fa-solid fa-arrow-alt-circle-left" class="back-profile" @click="$router.push('profile'); flagConfCom = !flagConfCom ; dataComm()"></font-awesome-icon>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <img class="card-img-top profile-image" src="../assets/images/community.png" alt="Foto de perfil">
        </div>
      </div>
      <div class="row">
        <div class="col">
        </div>
      </div>
    </template>
    <!-- <div class="row">
      <div class="col">
        <b-card-text>
          <h5 class="profile-name mt-3">{{ name  + '  ' +  surname }}</h5>
        </b-card-text>
      </div>
    <div class="row">
      <div class="col">
        <b-button class="m-1">HOLA</b-button>
      </div>
      <div class="col">
        <b-button class="m-1">HOLA</b-button>
      </div>
      <div class="col">
        <b-button class="m-1">HOLA</b-button>
      </div>
      <div class="col">
        <b-button class="m-1">HOLA</b-button>
      </div>
    </div>
    </div> -->
  </b-card>
</template>

<script>
import CommunityServices from '../services/Community'
import DFServices from '../services/Doors_floors'
import BookingsServices from '../services/Bookings'
import BillsSpillsServices from '../services/Bills_Spills'
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
          console.log('Error al obtener informacion de los pisos y plantas ocupadas para la designación' + Error)
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
        if (result.isConfirmed) {
            let data = {
            floorNew: this.selected.f,
            doorNew: this.selected.d,
            floorP: this.userLogin.floor,
            doorP: this.userLogin.door
            }
            DFServices.updatePresident(data).then(
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
            console.log('Error en la designación' + Error)
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
          if (result.isConfirmed) {
            var data = {
            community_id: this.userLogin.community_id,
            door: this.selected1.d,
            floor: this.selected1.f
          }
          BillsSpillsServices.findAllDebs(data).then(
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
                DFServices.deleteDP(data).then(
                  Response => {
                    if (Response.status === 200) {
                      this.$swal.fire({
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        title: 'Registros de deudas y pagos eliminados del propietario, desasignando casa...!!'
                      }).then(() => {
                        DFServices.deleteOH(data).then(
                          Response => {
                            this.$swal.fire({
                              icon: 'success',
                              title: 'Vivienda libre de cargos y de propietario!!',
                              showConfirmButton: false,
                              timer: 2500
                            }).then(()=> {
                              console.log('Usuario desasignado correctamente de la casa' + Response)
                              this.$router.push({ path: '/login' }
                              )
                            })
                          },
                          Error => {
                            console.log('Fallo al desasignar usuario de la casa' + Error)
                          }
                        )
                      })
                    }
                  },
                  Error=> {
                    console.log('Error al eliminar los datos de las deudas y los pagos del usuario' + Error)
                  })
              }
            },
            Error => {
              console.log('Error al buscar datos de deudas' + Error)
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
        if (result.isConfirmed) {
          DFServices.deleteDoorman(this.userLogin.community_id).then(
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
              console.log('Error al eliminar al portero' + Error)
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

      if (this.last_paddle === 0 && this.confCommunity.has_paddle_court === 1) {
        BookingsServices.createRowsPaddle(this.userLogin.community_id).then(
          Response => {
            console.log('Añadidas las entradas de las pistas de padel a la tabla ' + Response)
          },
          Error => {
            console.log('Error al añadir las entradas de las pistas de padel a la tabla ' + Error)
          })
      } 
      if (this.last_paddle === 1 && this.confCommunity.has_paddle_court === 0) {
        BookingsServices.deleteRowsPaddle(this.userLogin.community_id).then(
          Response => {
            console.log('Eliminadas las entradas de las pistas de padel a la tabla ' + Response)
          },
          Error => {
            console.log('Error al eliminar las entradas de las pistas de tenis a la tabla ' + Error)
        })
      }
      if (this.last_tennis === 0 && this.confCommunity.has_tennis_court === 1) {
        BookingsServices.createRowsTennis(this.userLogin.community_id).then(
          Response=> {
            console.log('Añadidas las entradas de las pistas de tenis a la tabla ' + Response)
          },
          Error => {

          })
      }
      if (this.last_tennis === 1 && this.confCommunity.has_tennis_court === 0) {
        BookingsServices.deleteRowsTennis(this.userLogin.community_id).then(
          Response=> {
            console.log('Eliminadas las entradas de las pistas de tenis a la tabla ' + Response)
          },
          Error => {
            console.log('Error al eliminar las entradas de las pistas de tenis a la tabla ' + Error)
        })
      }
      CommunityServices.updateCommunity(this.userLogin.community_id,this.confCommunity).then(
        Response =>{
          this.$swal.fire({
            icon: 'success',
            text: 'Configuración de comunidad guardada con exito!'
            }).then(() => {
              console.log('Datos de la comunidad actualizados correctamente' + Response)
              localStorage.removeItem('confCom')
              localStorage.setItem('confCom', JSON.stringify(this.confCommunity))
              this.$router.push({ path: '/login' })
            })
        },
        Error => {
          console.log('Error al actualizar los datos de la comunidad' + Error)
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
.profile-card {
  padding: 20px;
  text-align: center;
  background-color: #05506b;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.profile-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.profile-description {
  font-size: 16px;
}

.profile-image {
  width: 150px; /* Establece el ancho deseado */
  height: auto; /* Mantiene la proporción de aspecto */
  margin: 0 auto; /* Centra la imagen horizontalmente */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Agrega una sombra */
  border-radius: 114px;
}
.back-profile {
  font-size: 23px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out; /* Aplica una transición de 0.3 segundos con una función de aceleración suave */
}
.back-profile:hover {
  color: #c7b9af;
  transform: scale(1.5); /* Aumenta el tamaño del icono al 150% al hacer hover */

}
</style>
