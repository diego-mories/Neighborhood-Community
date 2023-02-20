<template>
<div>
  <b-form>
    <span><img src="../assets/logo.png"></span>
    <b-form-group>
      <div class="input-group mb-3">
        <label class="label-login">Email</label>
        <span class="input-group-text" id="basic-addon1">📧</span>
        <b-form-input type="text" class="form-control" placeholder="your-email@gmail.com"></b-form-input>
        <label class="label-login">Contraseña</label>
        <span class="input-group-text" id="basic-addon1">🔐</span>
        <b-form-input type="text" class="form-control" placeholder="Contraseña"></b-form-input>
      </div>
        <b-button variant="outline-primary" type="submit" @click="$router.push('loginPresident')">Iniciar sesion</b-button>
        <div class="input-group m-1"><router-link to="/forgotPassword"><label id="forgot-password"><u>¿Recuperar Contraseña?</u></label></router-link></div>
    </b-form-group>
  </b-form>
</div>
</template>

<script>
</script>

<style>
</style>
