<template>
  <div>
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
        <b-form-input
          style="width: 140px;"
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
    </b-form-group>
    <div class="row d-flex flex-grow-1">
      <div class="col-8 m-auto mt-0">
        <b-form-group>
          <b-button class="m-1 custom-button" variant="outline-primary" type="submit" @click.stop.prevent="save()">GUARDAR</b-button>
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
      selected: null,
      dataForm: {amount: null, date: null},
      userLogin: {}
    }
  },
  created () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.dataForm.community_id = this.userLogin.community_id
  },
  methods: {
    save () {
      this.dataForm.type = this.selected
      this.$validator.validateAll(['input-house2','input-dataForm-date','input-dataForm-amount']).then(result => {
        if (!result) {
          return
        }
        BillsSpillsServices.createBill(this.dataForm).then(
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
            console.log('Error al añadir una cuenta nueva')
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
