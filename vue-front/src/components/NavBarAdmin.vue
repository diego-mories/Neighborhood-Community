<template>
    <div class="row" id="NavBar">
        <nav class="navBarA" toggleable="lg" type="dark">
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/newCommunity" exact>
                    Crear Comunidad
                    <!-- ICON COMMUNITY --> <font-awesome-icon icon="fa-solid fa-group-arrows-rotate"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link to="/"  class="log-out-icon"><span @click="deleteDataUserLogin"><font-awesome-icon icon="fa-solid fa-sign-out-alt"/></span></router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  methods: {
    deleteDataUserLogin () {
      console.log('Borramos los datos del usuario logueado')
      localStorage.removeItem('userLogin')
      history.pushState(null, null, location.href)
      history.back()
      history.forward()
      window.onpopstate = function () { history.go(1) }
    }
  }
}
</script>

<style>
#NavBar{
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
    background-color: aqua;
}
</style>
