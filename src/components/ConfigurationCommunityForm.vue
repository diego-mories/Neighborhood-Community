<template>
<div>
    <b-form>
    <span><img class="w-50 h-50 mw-50 mh-50" src="../assets/images/community.png"></span>
    <div class="input-group mb-3 ">
        <select class="form-select" aria-label="Default select example">
        <option selected>¿Hay portero?</option>
        <option value="1">Si</option>
        <option value="2">No</option>
        </select>
        <div class="m-2 d-inline-flex justify-content-center">
            <input class="m-2" type="checkbox" id="cameras"/>
            <span class="d-flex align-items-center">¿Hay cámaras?</span>
        </div>
    </div>
    <div class="input-group mb-3 d-flex">
        <b-form-input type="number" class="form-control w-5 mr-1" min="0" max="10" placeholder="Plantas"></b-form-input>
        <b-form-input type="text" class="form-control w-5 mr-1" placeholder="Pisos"></b-form-input>
    </div>
    <div class="input-group mb-3 d-flex justify-content-center">
        <input class="m-2" type="checkbox" id="cameras"/>
        <span class="d-flex align-items-center">¿Hay pista de padel?</span>
        <input class="m-2" type="checkbox" id="cameras"/>
        <span class="d-flex align-items-center">¿Hay pista de tenis?</span>
    </div>
    <b-button variant="outline-primary" type="submit" @click="$router.push('login')">Guardar configuración</b-button>
    </b-form>
  </div>
  </template>

<script>
export default {

}
</script>

<style>

</style>
