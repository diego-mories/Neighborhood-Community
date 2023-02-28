<template>
    <div class="row" id="NavBar">
        <nav class="navBarO" toggleable="lg" type="dark">
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bookingCourts" exact>
                    Reservas
                    <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/notices" exact>
                    Avisos
                    <!-- ICON NOTICES --> <font-awesome-icon icon="fa-solid fa-thumbtack"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/deliveries" exact>
                    Entregas
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-box-open"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <button type="button" class="bootstrap-btn" @click="$router.push('/profile')"><font-awesome-icon icon="fa-solid fa-user"/>  Diego Mories (O)</button>
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
}
</style>
