<template>
  <div id="full">
    <b-form @submit.prevent="newCommunity">
    <span><img class="w-25 h-25 mw-25 mh-25 mb-5" src="../assets/images/community.png"></span>
        <b-form-group>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">🏡</span>
              <b-form-input type="text" class="form-control" placeholder="Nombre comunidad" v-model="confCommunity.nameC"></b-form-input>
            </div>
            <div class="input-group mb-3 d-flex">
              <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Plantas" v-model="confCommunity.floors"></b-form-input>
              <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Puertas" v-model="confCommunity.doors"></b-form-input>
              <input class="m-2" type="checkbox" id="cameras" value="1" v-model="letters"/>
              <span class="d-flex align-items-center">¿Puertas con letras? (1=A 2=A,B 3=A,B,C 4=A,B,C,D 5=A,B,C,D,E)</span>
            </div>
        </b-form-group>
        <b-form-group>
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
        </b-form-group>
        <b-form-group>
          <div class="input-group mb-3 d-flex">
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
            <b-form-input type="text" class="form-control" placeholder="Nombre presidente" v-model="user.name"></b-form-input>
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
            <b-form-input type="text" class="form-control" placeholder="Apellidos presidente" v-model="user.surname"></b-form-input>
          </div>
        </b-form-group>
        <b-form-group>
          <div class="input-group mb-3 d-flex">
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
              <b-form-input type="email" class="form-control" placeholder="email-presidente@gmail.com" v-model="user.email"></b-form-input>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon class="mr-1" icon="fa-solid fa-phone" />(+34)</span>
              <b-form-input type="tel" class="form-control" placeholder="XXX-XX-XX-XX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}" v-model="user.phone"></b-form-input>
          </div>
          <div class="input-group mb-3 d-flex">
            <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Mi planta" v-model="confCommunity.myFloor"></b-form-input>
            <b-form-input type="number" class="form-control w-5 mr-1" min="1" max="10" placeholder="Mi puerta" v-model="confCommunity.myDoor"></b-form-input>
            <span v-if ="letters" class="m-auto">(1=A 2=B 3=C 4=D 5=E)</span>
          </div>
        </b-form-group>
        <b-button variant="outline-primary" type="submit">Crear comunidad</b-button>
    </b-form>
</div>
</template>

<script>
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
    },
    letters: false,
    user: {}
  }),
  methods: {
    formatDoor (value) {
      if (value === '1' || value === 1) return 'A'
      if (value === '2' || value === 2) return 'B'
      if (value === '3' || value === 3) return 'C'
      if (value === '4' || value === 4) return 'D'
      if (value === '5' || value === 5) return 'E'
      if (value === '6' || value === 6) return 'F'
      if (value === '7' || value === 7) return 'G'
      if (value === '8' || value === 8) return 'H'
    },
    test () {
      console.log(this.formatDoor(1))
      console.log(this.formatDoor(2))
      console.log(this.formatDoor(3))
    },
    newCommunity () {
      if (this.confCommunity.myDoor > this.confCommunity.Doors || this.confCommunity.myFloor > this.confCommunity.floors) {
        swal({
          title: 'No puede elegir una puerta o plantas no disponible en el rango de configuración elegido',
          icon: 'error',
          button: 'OK'
        })
      } else {
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
          nameC: this.confCommunity.nameC,
          paddle: this.confCommunity.paddle,
          tennis: this.confCommunity.tennis,
          pool: this.confCommunity.pool,
          doorman: this.confCommunity.doorman,
          cameras: this.confCommunity.cameras,
          myDoor: this.confCommunity.myDoor,
          myFloor: this.confCommunity.myFloor,
          floors: this.confCommunity.floors,
          doors: this.confCommunity.doors
        }
        // Damos de alta una nueva comunidad, registramos las viviendas que existen
        Services.newCommunity(data).then(
          Response => {
            for (let iteratorF = 1; iteratorF <= data.floors; iteratorF++) {
              for (let iteratorD = 1; iteratorD <= data.doors; iteratorD++) {
                // Creamos una fila en la tabla doors y floors con los datos de id_community y los iteradores
                if (this.letters) {
                  let dataFD = {
                    community_id: Response.data.community_id,
                    floor: iteratorF,
                    door: this.formatDoor(iteratorD)
                  }
                  Services.insertRowsFD(dataFD).then(
                    Response => {
                      console.log('Fila añadida a doors_floors')
                    },
                    Error => {
                      console.log('Error en cambio desde FRONT de insertarFilas en doors and floors')
                    }
                  )
                } else {
                  let dataFD = {
                    community_id: Response.data.community_id,
                    floor: iteratorF,
                    door: iteratorD
                  }
                  Services.insertRowsFD(dataFD).then(
                    Response => {
                      console.log('Fila añadida a doors_floors')
                    },
                    Error => {
                      console.log('Error en cambio desde FRONT de insertarFilas en doors and floors')
                    }
                  )
                }
              }
            }
            this.user.community_id = Response.data.community_id
            this.user.role_id = 1 // President
            Services.signUp(this.user).then(
              Response => {
                this.user.id = Response.data.user_id
                if (this.letters) {
                  this.user.myDoor = this.formatDoor(this.confCommunity.myDoor)
                  this.user.myFloor = this.confCommunity.myFloor
                } else {
                  this.user.myDoor = this.confCommunity.myDoor
                  this.user.myFloor = this.confCommunity.myFloor
                }
                console.log(this.user)
                Services.uptadeFD(this.user).then(
                  Response => {
                    this.$swal.fire({
                      icon: 'success',
                      title: 'Nueva comunidad creada correctamente!!',
                      text: Response.data.message
                    }).then(() => {
                      this.$router.push('/login')
                    })
                  },
                  Error => {
                    console.log('Error en insercion desde FRONT de filas y columnas del presidente creado tras la configuración')
                  }
                )
              },
              Error => {
                console.log('Error en Registro')
              }
            )
          }
        )
      }
    }
  }
}
</script>
