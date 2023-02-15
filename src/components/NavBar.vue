<template>
    <div class="row" id="NavBar">
        <b-navbar class="navBar" toggleable="lg" type="dark">
            <div class="componentsNavBar">
                <button type="button" class="bootstrap-btn"><font-awesome-icon icon="fa-solid fa-user"/>  Diego Mories</button>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/bookingCourts" exact>
                    Reserva
                    <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/" exact>
                    Avisos
                    <!-- ICON NOTICES --> <font-awesome-icon icon="fa-solid fa-thumbtack"/>
                </router-link>
            </div>
            <div class="componentsNavBar">
                <router-link tag="li" active-class="active" to="/" exact>
                    Entregas
                    <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-box-open"/>
                </router-link>
            </div>
        </b-navbar>
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
