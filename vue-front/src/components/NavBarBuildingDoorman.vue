<template>
    <div class="row" id="NavBar">
        <nav class="navBarB" toggleable="lg" type="dark">
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/cameras" exact>
                    Cámaras
                    <!-- ICON VIDEO --> <font-awesome-icon icon="fa-solid fa-video"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link to="/" class="log-out-icon" @click="deleteDataUserLogin"><font-awesome-icon icon="fa-solid fa-sign-out-alt"/></router-link>
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
