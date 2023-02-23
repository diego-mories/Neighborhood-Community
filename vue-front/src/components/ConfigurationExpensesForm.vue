<template>
    <div>
    <b-form>
      <span><img src="../assets/logo.png"></span>
      <b-form-group>
        <div class="input-group mb-3">
          <label class="label-login">Gasto máximo</label>
          <span class="input-group-text" id="basic-addon1">💶</span>
          <b-form-input type="number" class="form-control" placeholder="Nuevo gasto máximo"></b-form-input>
          <b-form-input type="text" class="form-control" placeholder="70€" disabled></b-form-input>
          <label class="label-login">Gasto mínimo</label>
          <span class="input-group-text" id="basic-addon1">💶</span>
          <b-form-input type="number" class="form-control" placeholder="Nuevo gasto mínimo"></b-form-input>
          <b-form-input type="text" class="form-control" placeholder="50€" disabled></b-form-input>
        </div>
          <b-button variant="outline-primary" type="submit">Guardar</b-button>
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
