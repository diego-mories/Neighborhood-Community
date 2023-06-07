<template>
  <div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Nombre de la comunidad</label>
              <span class="input-group-text" id="basic-addon1">🏡</span>
                <b-form-input
                v-model="confCommunity.nameC"
                id="input-community-nameC"
                name="input-community-nameC"
                v-validate="{ required: true}"
                class="form-control"
                aria-describedby="input-community-nameC-live-feedback"
                placeholder="Nombre Comunidad"
                :state="validateState('input-community-nameC')"
                ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Plantas</label>
              <span class="input-group-text" id="basic-addon1">🏡</span>
              <b-form-input
              v-model="confCommunity.floors"
              id="input-community-floors"
              name="input-community-floors"
              v-validate="{ required: true, min_value:1,max_value:10}"
              type="number"
              min="1" max="10"
              class="form-control w-5 mr-1"
              aria-describedby="input-community-floors-live-feedback"
              placeholder="Plantas (min:1 max:10)"
              :state="validateState('input-community-floors')"
              ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Puertas por planta</label>
              <span class="input-group-text" id="basic-addon1">🏡</span>
              <b-form-input
              v-model="confCommunity.floors"
              id="input-community-floors"
              name="input-community-floors"
              v-validate="{ required: true, min_value:1,max_value:10}"
              type="number"
              min="1" max="10"
              class="form-control w-5 mr-1"
              aria-describedby="input-community-floors-live-feedback"
              placeholder="Plantas (min:1 max:10)"
              :state="validateState('input-community-floors')"
              ></b-form-input>
            </div>
          </b-form-group>
      </div>
      <div class="col-2">
        <div style="margin-top: 43px; display: flex;">
          <input type="checkbox" value="1" v-model="letters"/>
          <span class="ml-2">Letra</span>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <input type="checkbox" value="1" v-model="confCommunity.has_paddle_court"/>
        <span >Pista de padel</span>
      </div>
      <div class="col">
        <input  type="checkbox"  value="1" v-model="confCommunity.has_tennis_court"/>
        <span >Pista de tenis</span>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
          <input type="checkbox"  value="1" v-model="confCommunity.has_pool"/>
          <span>Piscina</span>
        </div>
        <div class="col">
          <input  type="checkbox"   value="1" v-model="confCommunity.has_cameras"/>
          <span >Cámaras</span>
        </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Nombre del presidente</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
            <b-form-input
              v-model="user.name"
              id="input-user-name"
              name="input-user-name"
              v-validate="{ required: true, alpha_spaces: true}"
              class="form-control"
              aria-describedby="input-user-name-live-feedback"
              placeholder="Nombre Presidente"
              :state="validateState('input-user-name')"
              ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Apellidos del presidente</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
              <b-form-input
                v-model="user.surname"
                id="input-user-surname"
                name="input-user-surname"
                v-validate="{ required: true, alpha_spaces:true}"
                class="form-control"
                aria-describedby="input-user-surname-live-feedback"
                placeholder="Apellidos Presidente"
                :state="validateState('input-user-surname')"
                ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Email del presidente</label>
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
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Teléfono del presidente</label>
              <span class="input-group-text" id="basic-addon1"><font-awesome-icon class="mr-1" icon="fa-solid fa-phone" />(+34)</span>
              <b-form-input
                v-model="user.phone"
                id="input-user-phone"
                name="input-user-phone"
                v-validate="{ required: true, digits:9}"
                type="number"              
                class="form-control"
                aria-describedby="input-user-phone-live-feedback"
                placeholder="Teléfono (9 dígitos)"
                :state="validateState('input-user-phone')"
              ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Planta de vivienda de presidente</label>
              <span class="input-group-text" id="basic-addon1">🏡</span>
              <b-form-input
              v-model="confCommunity.myFloor"
              id="input-community-myFloor"
              name="input-community-myFloor"
              v-validate="{ required: true, min_value:1,max_value: confCommunity.floors}"
              type="number"
              min="1" max="10"
              class="form-control w-5 mr-1"
              aria-describedby="input-community-myFloor-live-feedback"
              placeholder="Mi planta"
              :state="validateState('input-community-myFloor')"
            ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <b-form-group>
            <div class="input-group">
              <label class="label-login">Puerta de vivienda de presidente</label>
              <span class="input-group-text" id="basic-addon1">🏡</span>
              <b-form-input
              v-model="confCommunity.myDoor"
              id="input-community-myDoor"
              name="input-community-myDoor"
              v-validate="{ required: true, min_value:1,max_value: confCommunity.doors}"
              type="number"
              min="1" max="10"
              class="form-control w-5 mr-1"
              aria-describedby="input-community-myDoor-live-feedback"
              placeholder="Mi planta"
              :state="validateState('input-community-myDoor')"
            ></b-form-input>
            </div>
          </b-form-group>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span v-if ="letters" class="m-auto">(1=A 2=B 3=C 4=D 5=E)</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-button class="m-1 custom-button" variant="outline-primary" @click.prevent="newCommunity()">CREAR COMUNIDAD</b-button>
      </div>
    </div>
</div>
</template>

<script>
import UsersServices from '../services/Users'
import DFServices from '../services/Doors_floors'
import CommunityServices from '../services/Community'
import BookingsServices from '../services/Bookings'
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
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
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
    newCommunity () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return 
        }
        else {
        if (this.confCommunity.paddle) this.confCommunity.paddle = 1
        else this.confCommunity.paddle = 0
        if (this.confCommunity.tennis) this.confCommunity.tennis = 1
        else this.confCommunity.tennis = 0
        if (this.confCommunity.pool) this.confCommunity.pool = 1
        else this.confCommunity.pool = 0
        if (this.confCommunity.doorman) this.confCommunity.doorman = 1
        else this.confCommunity.doorman = 0
        if (this.confCommunity.cameras) this.confCommunity.cameras = 1
        else this.confCommunity.cameras = 0
          
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
        UsersServices.findOneEmail(this.user.email).then(
          Response => {
            if (Response.data.rowCount.length === 0) {
              CommunityServices.newCommunity(data).then(
                Response => {
                  for (let iteratorF = 1; iteratorF <= data.floors; iteratorF++) {
                    for (let iteratorD = 1; iteratorD <= data.doors; iteratorD++) {
                      if (this.letters) {
                        let dataFD = {
                          community_id: Response.data.community_id,
                          floor: iteratorF,
                          door: this.formatDoor(iteratorD)
                        }
                        
                        DFServices.insertRowsFD(dataFD).then(
                          Response => {
                            console.log('Fila añadida a doors_floors' + Response)
                          },
                          Error => {
                            console.log('Error en cambio desde FRONT de insertarFilas en doors and floors' + Error)
                          }
                        )
                      } else {
                        let dataFD = {
                          community_id: Response.data.community_id,
                          floor: iteratorF,
                          door: iteratorD
                        }
                        DFServices.insertRowsFD(dataFD).then(
                          Response => {
                            console.log('Fila añadida a doors_floors' + Response)
                          },
                          Error => {
                            console.log('Error en cambio desde FRONT de insertarFilas en doors and floors' + Error)
                          }
                        )
                      }
                    }
                  }
                  if (this.confCommunity.paddle) {
                    BookingsServices.createRowsPaddle(Response.data.community_id).then(
                      Response=> {
                        console.log('Añadidas las entradas de las pistas de padel a la tabla ' + Response)
                      },
                      Error => {
                        console.log('Error al crear filas en pista de padel' + Error)
                      })
                  }
                  if (this.confCommunity.tennis) {
                    BookingsServices.createRowsTennis(Response.data.community_id).then(
                      Response=> {
                        console.log('Añadidas las entradas de las pistas de tenis a la tabla ' + Response)
                      },
                      Error => {
                        console.log('Error al crear filas en pista de tenis' + Error)
                      })
                  }
                  this.user.community_id = Response.data.community_id
                  this.user.role_id = 1 
                  UsersServices.signUp(this.user).then(
                    Response => {
                      this.user.id = Response.data.user_id
                      if (this.letters) {
                        this.user.myDoor = this.formatDoor(this.confCommunity.myDoor)
                        this.user.myFloor = this.confCommunity.myFloor
                      } else {
                        this.user.myDoor = this.confCommunity.myDoor
                        this.user.myFloor = this.confCommunity.myFloor
                      }
                      DFServices.uptadeFD(this.user).then(
                        Response => {
                          this.$swal.fire({
                            icon: 'success',
                            title: 'Nueva comunidad creada correctamente!!'
                          }).then(() => {
                            console.log('Nueva comunidad creada correctamente' + Response)
                            this.$router.push('/login')
                          })
                        },
                        Error => {
                          console.log('Error en insercion desde FRONT de filas y columnas del presidente creado tras la configuración' + Error)
                        }
                      )
                    },
                    Error => {
                      console.log('Error al dar de alta al usuario' + Error)
                    }
                  )
                },
                Error => {
                  this.$swal.fire({
                    icon: 'error',
                    text: Error.data
                  })
                }
              )
            } else {
              this.$swal.fire({
                icon: 'error',
                text: 'Email ya existente en la plataforma'
              })
            }
          }
        )
      } 
    })
    }
  }
}
</script>
