<template>
<div>
    <b-form>
        <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
        <b-form-group>
            <div class="input-group">
                <label class="label-login">Nombre</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Nombre" v-model="newUser.name"></b-form-input>
                <label class="label-login">Apellidos</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Apellidos" v-model="newUser.surname"></b-form-input>
                <label class="label-login">Email</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
                <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com" v-model="newUser.email"></b-form-input>
            </div>
        </b-form-group>
        <div class="input-group mb-3 d-flex justify-content-center">
            <label class="label-login">Selecciona planta y piso</label>
            <b-form-select class="ml-3 mr-3 " v-model="selected" :options="options"></b-form-select>
        </div>
        <b-button class="mt-3" variant="outline-primary" type="submit">Registrar</b-button>
    </b-form>
</div>
</template>

<script>
import Services from '../services/servicesDB'
export default {
  data () {
    return {
      newUser: {},
      userLogin: null,
      selected: {},
      options: []
    //   selectedD: null,
    //   doors: '',
    //   optionsD: [
    //     { value: null, text: 'Selecciona la puerta a la que pertenece el propietario' }
    //   ]
    }
  },
  methods: {
    // Metodo para buscar la información sobre las puertas y plantas vacias de la comunidad de este presidente:
    searchMyCommunity () {
      // console.log(this.userLogin.community_id)
      Services.searchMyCommunity(this.userLogin.community_id).then(
        Response => {
          this.floors_doors = Response.data.floors_doors
          for (let floorDoor of this.floors_doors) {
            this.options.push({value: {f: floorDoor.floor, d: floorDoor.door}, text: 'Planta ' + floorDoor.floor + ' Piso ' + floorDoor.door})
            // this.optionsD.push({value: floorDoor.door, text: 'Piso ' + floorDoor.door})
          }
          // console.log(this.optionsD.length + this.optionsF.length)
        },
        Error => {
          console.log('Error al obtener informacion de los pisos y plantas disponibles')
        }
      )
    },
    registerUser () {

    }
  },
  mounted () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.searchMyCommunity()
    this.newUser.community_id = this.userLogin.community_id
    this.newUser.role = 3 // Owner por defecto
    this.options.value = null
  },
  created () {
  }
}
</script>

<style>

</style>
