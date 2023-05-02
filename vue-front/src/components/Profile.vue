<template>
  <div class="screen" id="full">
    <div class="card p-5 center-form" id="full">
        <div class="row d-flex">
          <div class="col-sm-2 " id="full">
            <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('login')">Volver</button>
          </div>
          <div class="col-sm-10" id="full"><h4>{{name + ' ' + surname}}</h4>
          <img src="../assets/images/perfil.png" class="rounded" id="profileImage"></div></div>
        <div class="row justify-content-center" id="grid-bottom-profile full">
          <div class="col-sm-2"></div>
          <div class="col-sm-5" id="full"><button class="btn btn-sm btn-outline-primary" @click="$router.push('changePassword')" id="profileButton">Cambiar contraseña</button></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    surname: ''
  }),
  created () {
    let dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
    this.name = dataUserLogin.name
    this.surname = dataUserLogin.surname
  }

}
</script>

<style>
#profileImage{
    margin: 8%;
    width: 25%;
}
</style>
