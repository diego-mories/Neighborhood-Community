<template>
<div>
    <b-button variant="outline-primary" type="submit" @click="cancelConf()">Cancelar configuración</b-button>
    <b-form>
    <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/community.png"></span>
    <div class="input-group mb-3 d-flex">
        <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Plantas" v-model="confCommunity.floors"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Pisos" v-model="confCommunity.doors"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Mi planta" v-model="confCommunity.myFloor"></b-form-input>
        <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Mi piso" v-model="confCommunity.myDoor"></b-form-input>
    </div>
    <div class="input-group mb-3 d-flex justify-content-center">
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.paddle"/>
        <span class="d-flex align-items-center">¿Hay pista de padel?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.tennis"/>
        <span class="d-flex align-items-center">¿Hay pista de tenis?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.pool"/>
        <span class="d-flex align-items-center">¿Hay piscina?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.doorman"/>
        <span class="d-flex align-items-center">¿Hay portero?</span>
        <input class="m-2" type="checkbox" id="cameras" value="1" v-model="confCommunity.cameras"/>
        <span class="d-flex align-items-center">¿Hay cámaras?</span>
    </div>
    <b-button variant="outline-primary" type="submit" @click.prevent="saveConf()">Guardar configuración</b-button>
    <!-- <span>Checked names: {{ confCommunity }}</span> -->
    </b-form>
</div>
</template>

<script>
import { exit } from 'shelljs'
import Services from '../services/servicesDB'
import swal from 'sweetalert'

export default {
  data: () => ({
    confCommunity: {
      paddle: 0,
      tennis: 0,
      pool: 0,
      doorman: 0,
      cameras: 0,
      doors: null,
      floors: null,
      myDoor: null,
      myFloor: null
    }
  }
  ),
  methods: {
    cancelConf () {
      localStorage.removeItem('userLogin')
      this.$router.push('/')
      history.pushState(null, null, location.href)
      history.back()
      history.forward()
      window.onpopstate = function () { history.go(1) }
    },
    saveConf () {
      if (this.confCommunity.myDoor > this.confCommunity.Doors || this.confCommunity.myFloor > this.confCommunity.floors) {
        swal({
          title: 'No puede elegir una puerta o plantas no disponible en el rango de configuración elegido',
          icon: 'error',
          button: 'OK'
        })
      } else {
        // Actualizamos en nuestro localStorage first_time a 0
        let userLogin = JSON.parse(localStorage.getItem('userLogin'))
        userLogin.first_time = 0
        localStorage.removeItem('userLogin')
        localStorage.setItem('userLogin', JSON.stringify(userLogin))
        if (this.confCommunity.paddle) {
          this.confCommunity.paddle = 1
        }
        if (this.confCommunity.tennis) {
          this.confCommunity.tennis = 1
        }
        if (this.confCommunity.pool) {
          this.confCommunity.pool = 1
        }
        if (this.confCommunity.doorman) {
          this.confCommunity.doorman = 1
        }
        if (this.confCommunity.cameras) {
          this.confCommunity.cameras = 1
        }
        let data = {
          id: userLogin.id,
          community_id: userLogin.community_id,
          paddle: this.confCommunity.paddle,
          tennis: this.confCommunity.tennis,
          pool: this.confCommunity.pool,
          doorman: this.confCommunity.paddle,
          cameras: this.confCommunity.cameras,
          myDoor: this.confCommunity.myDoor,
          myFloor: this.confCommunity.myFloor,
          floors: this.confCommunity.floors,
          doors: this.confCommunity.doors
        }
        // Actualizamos en base de datos el first_time a 0
        Services.confCommunity(data).then(
          Response => {
            // Si todo va bien en el registro de la configuración de la comunidad (Meter datos de la comunidad y actualizar datos del presidente de su puerta y piso), llamamos de forma anidada a la creacion de datos en la tabla de doors_floors y asignamos la puerta y planta del presidente configurado
            for (let iteratorF = 1; iteratorF <= data.floors; iteratorF++) {
              for (let iteratorD = 1; iteratorD <= data.doors; iteratorD++) {
                // Creamos una fila en la tabla doors y floors con los datos de id_community y los iteradores
                let dataFD = {
                  community_id: data.community_id,
                  floor: iteratorF,
                  door: iteratorD
                }
                Services.insertRowsFD(dataFD).then(
                  Response => {
                  },
                  Error => {
                    console.log('Error en cambio desde FRONT de insertarFilas en doors and floors')
                  }
                )
              }
            }
            Services.uptadeFD(data).then(
              Response => {

              },
              Error => {
                console.log('Error en insercion desde FRONT de filas y columnas del presidente creado tras la configuración')
              }
            )
            this.$router.push('/login')
          },
          Error => {
            console.log('Error en cambio desde FRONT de confCommunity')
            exit()
          }
        )
        // Actualizamos los datos en la fila correspondiente, metiendo el id del presidente en floors y doors y poniendo is_available a false
      }
    }
  }
}
</script>

<style>

</style>
