<template>
  <div>
    <b-form>
    <span><img class="w-50 h-50 mw-50 mh-50" src="../assets/images/community.png"></span>
        <b-form-group>
            <div class="input-group mb-3">
                <label class="label-login">Nombre de la comunidad</label>
                <span class="input-group-text" id="basic-addon1">🏡</span>
                <b-form-input type="text" class="form-control" placeholder="Nombre comunidad"></b-form-input>
                <label class="label-login">Email presidente</label>
                <span class="input-group-text" id="basic-addon1">📧</span>
                <b-form-input type="text" class="form-control" placeholder="email@gmail.com"></b-form-input>
            </div>
        </b-form-group>
        <b-button variant="outline-primary" type="submit">Crear comunidad</b-button>
    </b-form>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
