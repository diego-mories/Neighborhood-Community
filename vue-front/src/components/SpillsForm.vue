<template>
    <div>
      <b-form>
      <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/compra-inmuebles-naranja.png"></span>
          <b-form-group>
            <div class="input-group mb-3 align-items-center">
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
              <b-form-invalid-feedback id="input-dataForm-amount" class="msgE2">
                {{ veeErrors.first('input-dataForm-amount')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
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
              <b-form-invalid-feedback id="input-dataForm-date" class="msgE2">
                {{ veeErrors.first('input-dataForm-date')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
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
              <b-form-invalid-feedback id="input-dataForm-description" class="msgE2">
                {{ veeErrors.first('input-dataForm-description')?'Campo obligatorio':'' }}
              </b-form-invalid-feedback>
            </div>
          </b-form-group>
          <b-button variant="outline-primary" type="submit" @click.stop.prevent="save()">GUARDAR</b-button>
      </b-form>
  </div>
  </template>
<script>
import servicesDB from '../services/servicesDB'
import BillsSpillsServices from '../services/Bills_Spills'
export default {
  data () {
    return {
      dataForm: {amount: null, description: ''},
      userLogin: {}
    }
  },
  methods: {
    save () {
      this.$validator.validateAll(['input-dataForm-description','input-dataForm-amount','input-dataForm-date']).then(result => {
        if (!result) {
          return 
        }
        console.log(this.dataForm)
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
  },
  mounted () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.dataForm.community_id = this.userLogin.community_id
  }
}
</script>

<style>

</style>
