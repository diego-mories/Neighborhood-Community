<template>
  <div>
  <b-form>
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1">🔐</span>
        <b-form-input type="password" class="form-control" placeholder="Contraseña"></b-form-input>
        <label class="label-login">Repetir contraseña</label>
        <span class="input-group-text" id="basic-addon1">🔐</span>
        <b-form-input type="password" class="form-control" placeholder="Contraseña"></b-form-input>
      </div>
        <b-button variant="outline-primary" type="submit">Cambiar contraseña</b-button>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
