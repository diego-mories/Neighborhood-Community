<template>
    <div>
      <b-form>
      <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/compra-inmuebles-naranja.png"></span>
          <b-form-group>
            <div class="input-group mb-3 align-items-center">
              <b-form-input type="number" class="form-control w-5 mr-3" min="0" placeholder="Cantidad" v-model="dataForm.amount" required></b-form-input>
              <input type="month" id="start" v-model="dataForm.date" required>
              <span class="validity m-0 p-0"></span>
            </div>
            <div class="input-group mb-3">
              <label class="label-login">Descripción</label>
              <textarea  class="m-auto" name="description" cols="100" rows="5" v-model="dataForm.description"></textarea>
            </div>
          </b-form-group>
          <b-button variant="outline-primary" type="submit" @click.stop.prevent="save()">Guardar</b-button>
      </b-form>
  </div>
  </template>
<script>
import servicesDB from '../services/servicesDB'
export default {
  data () {
    return {
      dataForm: {amount: null, description: ''},
      userLogin: {}
    }
  },
  methods: {
    save () {
      servicesDB.createSpill(this.dataForm).then(
        Response => {
          this.$swal.fire({
            icon: 'success',
            text: 'Derrama añadida correctamente'
          }).then(() => {
            this.$router.push({ path: `/login` })
          })
        },
        Error => {
        }
      )
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
