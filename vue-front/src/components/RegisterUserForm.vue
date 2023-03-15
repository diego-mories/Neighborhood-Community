<template>
<div>
    <b-form>
        <span><img src="../assets/images/newuser.png" class="w-25 h-25 mw-25 mh-25"></span>
        <b-form-group>
            <div class="input-group mb-3">
                <label class="label-login">Nombre</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Nombre"></b-form-input>
                <label class="label-login">Apellidos</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-user-alt"/></span>
                <b-form-input type="text" class="form-control" placeholder="Apellidos"></b-form-input>
                <label class="label-login">Email</label>
                <span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="fa-solid fa-envelope" /></span>
                <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com"></b-form-input>
            </div>
        </b-form-group>
        <b-dropdown id="dropdown-1" text="Seleccione el piso" class="m-md-2">
            <b-dropdown-item>2ºA</b-dropdown-item>
            <b-dropdown-item>2ºB</b-dropdown-item>
            <b-dropdown-item>3ºA</b-dropdown-item>
        </b-dropdown>
        <b-button variant="outline-primary" type="submit">Registrar</b-button>
    </b-form>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
