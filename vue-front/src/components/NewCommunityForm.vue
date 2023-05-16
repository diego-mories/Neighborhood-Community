<template>
  <div id="full">
    <b-form @submit.prevent="newCommunity">
    <span><img class="w-25 h-25 mw-25 mh-25 mb-0" src="../assets/images/community.png"></span>
        <b-form-group class="mb-0">
            <div class="input-group mb-3">
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
              <b-form-invalid-feedback id="input-community-nameC" class="msgE2">
                {{ veeErrors.first('input-community-nameC')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
            </div>
            <div class="input-group mb-3 d-flex">
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
              <b-form-invalid-feedback id="input-community-floors" class="msgE2">
                {{ veeErrors.first('input-community-floors')?'Campo obligatorio(min:1,max:10)':'' }}
              </b-form-invalid-feedback>
              <b-form-input
              v-model="confCommunity.doors"
              id="input-community-doors"
              name="input-community-doors"
              v-validate="{ required: true, min_value:1,max_value:10}"
              type="number"
              class="form-control w-5 mr-1"
              aria-describedby="input-community-doors-live-feedback"
              placeholder="Puertas por planta (min:1 max:10)"
              :state="validateState('input-community-doors')"
              ></b-form-input>
              <b-form-invalid-feedback id="input-community-doors" class="msgE2">
                {{ veeErrors.first('input-community-doors')?'Campo obligatorio(min:1,max:10)':'' }}
              </b-form-invalid-feedback>
              <input class="m-2" type="checkbox" id="cameras" value="1" v-model="letters"/>
              <span class="d-flex align-items-center">¿Puertas con letras?</span>
            </div>
        </b-form-group>
        <b-form-group class="mb-0">
          <div class="input-group  mb-3 d-flex justify-content-center">
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
        <b-form-group class="mb-0">
          <div class="input-group mb-3">
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
            <b-form-invalid-feedback id="input-user-name" class="msgE2">
              {{ veeErrors.first('input-user-name')?'Campo obligatorio':'' }}
            </b-form-invalid-feedback>
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
            <b-form-invalid-feedback id="input-user-surname" class="msgE2">
              {{ veeErrors.first('input-user-surname')?'Campo obligatorio':'' }}
            </b-form-invalid-feedback>
          </div>
        </b-form-group>
        <b-form-group>
          <div class="input-group mb-3 d-flex">
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
            <b-form-invalid-feedback id="input-user-email" class="msgE2">
              {{ veeErrors.first('input-user-email')?'Campo obligatorio':'' }}
            </b-form-invalid-feedback>
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
            <b-form-invalid-feedback id="input-user-phone" class="msgE2">
              {{ veeErrors.first('input-user-phone')?'Campo obligatorio':'' }}
            </b-form-invalid-feedback>
          </div>
          <div class="input-group mb-3 d-flex">
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
            <b-form-invalid-feedback id="input-community-myFloor" class="msgE2">
              {{ veeErrors.first('input-community-myFloor')?'Campo obligatorio(min:1,max:10)':'' }}
            </b-form-invalid-feedback>
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
            <b-form-invalid-feedback id="input-community-myDoor" class="msgE2">
              {{ veeErrors.first('input-community-myDoor')?'Campo obligatorio(min:1,max:10)':'' }}
            </b-form-invalid-feedback>
            <span v-if ="letters" class="m-auto">(1=A 2=B 3=C 4=D 5=E)</span>
          </div>
        </b-form-group>
        <b-button variant="outline-primary" type="submit">CREAR COMUNIDAD</b-button>
    </b-form>
</div>
</template>

<script>
// import Services from '../services/servicesDB'
import swal from 'sweetalert'
import servicesDB from '../services/servicesDB'
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
        if (this.confCommunity.myDoor > this.confCommunity.Doors || this.confCommunity.myFloor > this.confCommunity.floors) {
        swal({
          title: 'No puede elegir una puerta o plantas no disponible en el rango de configuración elegido',
          icon: 'error',
          button: 'OK'
        })
      } else {
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
        servicesDB.findOneEmail(this.user.email).then(
          Response => {
            if (Response.data.rowCount.length === 0) {
              servicesDB.newCommunity(data).then(
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
                        servicesDB.insertRowsFD(dataFD).then(
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
                        servicesDB.insertRowsFD(dataFD).then(
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
                  servicesDB.signUp(this.user).then(
                    Response => {
                      this.user.id = Response.data.user_id
                      if (this.letters) {
                        this.user.myDoor = this.formatDoor(this.confCommunity.myDoor)
                        this.user.myFloor = this.confCommunity.myFloor
                      } else {
                        this.user.myDoor = this.confCommunity.myDoor
                        this.user.myFloor = this.confCommunity.myFloor
                      }
                      servicesDB.uptadeFD(this.user).then(
                        Response => {
                          this.$swal.fire({
                            icon: 'success',
                            title: 'Nueva comunidad creada correctamente!!'
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
