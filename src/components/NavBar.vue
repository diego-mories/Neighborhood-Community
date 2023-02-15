<template>
    <div class="row" id="NavBar">
        <b-navbar class="navBar" toggleable="lg" type="dark">
            <div class="componentsNavBar">
                <button type="button" class="bootstrap-btn"><font-awesome-icon icon="fa-solid fa-user"/>  Diego Mories</button>
            </div>
            <div class="componentsNavBar">
                <span >Reservas </span>
                <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
            </div>
            <div class="componentsNavBar">
                <span>Avisos </span>
                <font-awesome-icon icon="fa-solid fa-thumbtack"/>
            </div>
            <div class="componentsNavBar">
                <span>Entregas </span>
                <font-awesome-icon icon="fa-solid fa-box-open"/>
            </div>
        </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.profile{
    margin: auto;
    padding: auto;
    border-radius: 25%;
}
#NavBar{
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
}
</style>
