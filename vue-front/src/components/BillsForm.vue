<template>
    <div>
      <b-form>
      <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/bill.png"></span>
          <b-form-group>
            <div class="input-group mb-3">
              <select v-model="selected" class="form-select mx-auto mt-5" aria-label="Default select example" id="lang">
                <option value="null">Tipo de factura</option>
                <option value="1">Gas 🔥</option>
                <option value="2">Luz 💡</option>
                <option value="3">Agua 💧</option>
              </select>
            </div>
            <div class="input-group mb-3 align-items-center">
              <b-form-input type="number" class="form-control w-5 mr-3" min="0" placeholder="Cantidad" v-model="dataForm.amount" required></b-form-input>
              <input type="month" id="start" v-model="dataForm.date" required>
              <span class="validity m-0 p-0"></span>
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
      if (this.dataForm.type === null) {
        swal({
          title: 'Selecciona antes el tipo de gasto porfavor',
          icon: 'error',
          button: 'OK'
        })
      }
      if (this.dataForm.amount === null) {
        swal({
          title: 'Introduce una cantidad por favor',
          icon: 'error',
          button: 'OK'
        })
      }
      if (this.dataForm.date === null) {
        swal({
          title: 'Introduce una fecha por favor',
          icon: 'error',
          button: 'OK'
        })
      }
      if (this.dataForm.type !== null && this.dataForm.date !== null && this.dataForm.amount !== null) {
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
          }
        )
      }
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
