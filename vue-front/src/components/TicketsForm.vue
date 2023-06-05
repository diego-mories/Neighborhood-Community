<template>
  <div>
    <h2 v-if="tickets > 0">TICKETS DISPONIBLES HOY: {{ tickets }}</h2>
      <h2 v-else>NO QUEDAN TICKETS DISPONIBLES HOY, ESPERE A MAÑANA</h2>
    <div class="input-group d-flex justify-content-center">
      <b-form-group>
        <div class="input-group">
            <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope"/></span>
              <b-form-input
                v-model="email"
                id="input-email"
                name="input-email"
                v-validate="{ required: true, email:true }"
                type="email"
                class="form-control"
                aria-describedby="input-email-amount-live-feedback"
                placeholder="Email destinatario"
                :state="validateState('input-email')"
                :disabled="tickets === 0"
              ></b-form-input>
        </div>
      </b-form-group>
  </div>
  <div class="row d-flex flex-grow-1">
      <div class="col-8 m-auto mt-0">
        <b-form-group>
          <b-button class="m-1 custom-button" variant="outline-primary" type="submit" @click.stop.prevent="send() " :disabled="tickets === 0">ENVIAR TICKET</b-button>
        </b-form-group>
      </div>
  </div>  
  </div>
</template>
<script>
import UsersServices from '../services/Users'
import DFServices from '../services/Doors_floors'
export default {
  data () {
    return {
      userLogin: {},
      tickets: 0,
      email:'',
    }
  },
  created () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.getData()
  },
  methods: {
    getData() {
        let data = {
            community_id: this.userLogin.community_id,
            door: this.userLogin.door,
            floor: this.userLogin.floor,
        }
        DFServices.searchTickets(data).then(
            Response => {
                this.tickets = Response.data.tickets
                console.log(this.tickets)
            },
            Error => {
                console.log('Error al recoger el número de tickets disponibles' + Error)
            }
        )
    },
    send () {
        this.$validator.validateAll(['input-msg','input-house']).then(result => {
            if (!result) {
            return 
            } else {
                let data = {
                community_id: this.userLogin.community_id,
                door: this.userLogin.door,
                floor: this.userLogin.floor,
                email: this.email,
                tickets: this.tickets - 1
            }
            UsersServices.sendTicket(data).then(
                Response => {
                this.$swal.fire({
                    icon: 'success',
                    text: 'Ticket enviado correctamente'
                    }).then(() => {
                      console.log('Ticket enviado correctamente' + Response)
                      this.$router.push({ path: '/login' })
                    })
                },
                Error => {
                  console.log('Error al enviar el ticket' + Error)
                })
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
