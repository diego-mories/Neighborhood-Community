<template>
    <div>
      <b-form>
      <span><img class="w-25 h-25 mw-25 mh-25 mb-5" src="../assets/images/bill.png"></span>
          <b-form-group>
            <div class="input-group mb-3">
              <b-form-select
                v-model="selected"
                id="input-house2"
                name="input-house2"
                v-validate="{ required: true}"
                :state="validateState('input-house2')"
                aria-describedby="input-house2-live-feedback">
                <option value="null">Tipo de factura</option>
                <option value="1">Gas 🔥</option>
                <option value="2">Luz 💡</option>
                <option value="3">Agua 💧</option>
              </b-form-select>
              <b-form-invalid-feedback id="input-house2" class="msgE">
              {{ veeErrors.first('input-house2')?'Elige una opción':'' }}
              </b-form-invalid-feedback>                
            </div>
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
          </b-form-group>
          <b-button variant="outline-primary" type="submit" @click.stop.prevent="save()">Guardar</b-button>
      </b-form>
  </div>
  </template>
<script>
import swal from 'sweetalert'
import servicesDB from '../services/servicesDB'
export default {
  data () {
    return {
      selected: null,
      dataForm: {amount: null, date: null},
      userLogin: {}
    }
  },
  methods: {
    save () {
      this.dataForm.type = this.selected
      this.$validator.validateAll(['input-house2','input-dataForm-date','input-dataForm-amount']).then(result => {
        if (!result) {
          return
        }
        servicesDB.createBill(this.dataForm).then(
          Response => {
            if (Response.status === 200) {
              this.$swal.fire({
                icon: 'success',
                text: 'Cuenta añadida correctamente'
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
  created () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.dataForm.community_id = this.userLogin.community_id
  }
}
</script>

<style>

</style>
