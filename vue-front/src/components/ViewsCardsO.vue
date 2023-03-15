<template>
    <div class="container center-form" id="full">
        <b-row class="cards" id="full">
            <b-col class="col-lg-4 col-md-10 col-sm-10" id="full">
                <router-link class="btn buttonHomeMenu" tag="li" active-class="active" to="/bookingCourts" exact>
                        <!-- ICON COURTS --> <font-awesome-icon icon="fa-solid fa-table-tennis-paddle-ball"/>
                </router-link>
            </b-col>
            <b-col class="col-lg-4 col-md-10 col-sm-10" id="full">
                <router-link class="btn buttonHomeMenu" tag="li" active-class="active" to="/notices" exact>
                        <!-- ICON NOTICES --> <font-awesome-icon icon="fa-solid fa-thumbtack"/>
                </router-link>
            </b-col>
            <b-col class="col-lg-4 col-md-10 col-sm-10 align-items: center" id="full">
                <router-link class="btn buttonHomeMenu" tag="li" active-class="active" to="/deliveries" exact>
                        <!-- ICON DELIVERIES --> <font-awesome-icon icon="fa-solid fa-box-open"/>
                </router-link>
            </b-col>
        </b-row>
    </div>
    </template>

<script>
export default {

}
</script>

<style>

</style>
