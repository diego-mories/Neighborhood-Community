<template>
    <div>
      <b-form>
          <b-form-group>
            <span><img class="w-50 h-50 mw-50 mh-50 mb-5" src="../assets/images/ticket.png"></span>
            <h2 v-if="tickets > 0">TICKETS DISPONIBLES HOY: {{ tickets }}</h2>
            <h2 v-else>NO QUEDAN TICKETS DISPONIBLES HOY, ESPERE A MAÑANA</h2>
            <div class="input-group mb-3 align-items-center">
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
              <b-form-invalid-feedback id="input-email" class="msgE">
                {{ veeErrors.first('input-email')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
            </div>
          </b-form-group>
          <b-button variant="outline-primary" type="submit" @click.stop.prevent="send() " :disabled="tickets === 0">ENVIAR TICKET</b-button>
      </b-form>
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
