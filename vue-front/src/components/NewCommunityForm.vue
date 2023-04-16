<template>
  <div id="full">
    <b-form @submit.prevent="newCommunity">
    <span><img class="w-25 h-25 mw-25 mh-25 mb-5" src="../assets/images/community.png"></span>
        <b-form-group>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">🏡</span>
                <b-form-input type="text" class="form-control" placeholder="Nombre comunidad" v-model="community.nameC"></b-form-input>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
                <b-form-input type="email" class="form-control" placeholder="email@gmail.com" v-model="community.email"></b-form-input>
            </div>
            <div class="input-group mb-3 d-flex">
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Nombre presidente" v-model="community.name"></b-form-input>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Apellidos presidente" v-model="community.surname"></b-form-input>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon class="mr-1" icon="fa-solid fa-phone" />(+34)</span>
                <b-form-input type="tel" class="form-control" placeholder="XXX-XX-XX-XX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}" v-model="community.phone"></b-form-input>
            </div>
        </b-form-group>
        <b-button variant="outline-primary" type="submit">Crear comunidad</b-button>
    </b-form>
</div>
</template>

<script>
import Services from '../services/servicesDB'
import swal from 'sweetalert'
export default {
  data: () => ({
    community: {}
  }),
  methods: {
    async newCommunity () {
      // console.log(this.community)
      Services.newCommunity(this.community).then(
        Response => {
          if (Response.data.OK) {
            // Todo ha ido bien
            swal({
              title: Response.data.message,
              icon: 'success',
              button: 'OK'
            })
          } else {
            swal({
              title: Response.data.message,
              icon: 'error',
              button: 'OK'
            })
          }
        },
        Error => {
          console.log('Error en el registro de nueva comunidad')
        }
      )
    }
  }
}
</script>
