<template>
  <div>
    <b-form-group>
      <div class="input-group mb-3">
        <b-form-input
          v-model="dataForm.amount"
          id="input-dataForm-amount"
          name="input-dataForm-amount"
          v-validate="{ required: true }"
          type="number"
          class="form-control mr-3"
          aria-describedby="input-dataForm-amount-live-feedback"
          placeholder="Cantidad"
          :state="validateState('input-dataForm-amount')"
        ></b-form-input>
        <b-form-input
          v-model="dataForm.date"
          id="input-dataForm-date"
          name="input-dataForm-date"
          v-validate="{ required: true }"
          type="month"
          class="form-control mr-3"
          aria-describedby="input-dataForm-date-live-feedback"
          :state="validateState('input-dataForm-date')"
        ></b-form-input>
      </div>
      <div class="input-group mb-3">
        <label class="label-login">Descripción</label>
        <b-form-textarea
          v-model="dataForm.description"
          id="input-dataForm-description"
          name="input-dataForm-description"
          v-validate="{ required: true }"
          type="text"
          rows="5"
          class="form-control mr-3"
          aria-describedby="input-dataForm-description-live-feedback"
          :state="validateState('input-dataForm-description')"
        ></b-form-textarea>
      </div>
    </b-form-group>
    <div class="row d-flex flex-grow-1">
      <div class="col-8 m-auto mt-0">
        <b-form-group>
          <b-button class="m-1 custom-button" variant="outline-primary" @click.stop.prevent="save()">GUARDAR</b-button>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
import BillsSpillsServices from '../services/Bills_Spills'
export default {
  data () {
    return {
      dataForm: {amount: null, description: ''},
      userLogin: {}
    }
  },
  mounted () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.dataForm.community_id = this.userLogin.community_id
  },
  methods: {
    save () {
      this.$validator.validateAll(['input-dataForm-description','input-dataForm-amount','input-dataForm-date']).then(result => {
        if (!result) {
          return 
        }
        BillsSpillsServices.createSpill(this.dataForm).then(
        Response => {
          if (Response.status === 200) {
            this.$swal.fire({
              icon: 'success',
              text: 'Derrama añadida correctamente'
            }).then(() => {
              this.$router.push({ path: `/login` })
            })
          }
        },
        Error => {
          console.log('Error al crear nueva derrama' + Error)
        }) 
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
