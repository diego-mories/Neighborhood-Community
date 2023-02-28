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
                <router-link to="/" class="log-out-icon"><font-awesome-icon icon="fa-solid fa-sign-out-alt"/></router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {

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
