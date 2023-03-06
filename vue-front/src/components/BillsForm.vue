<template>
    <div>
      <b-form>
      <span><img class="w-25 h-25 mw-25 mh-25" src="../assets/images/bill.png"></span>
          <b-form-group>
            <div class="input-group mb-3">
                <select class="form-select mx-auto mt-5" aria-label="Default select example" id="lang">
                <option selected>Tipo de factura</option>
                <option>Gas 🔥</option>
                <option>Luz 💡</option>
                <option>Agua 💧</option>
                </select>
            </div>
            <div class="input-group mb-3 align-items-center">
                <b-form-input type="number" class="form-control w-5 mr-3" min="0" placeholder="Cantidad"></b-form-input>
                <input type="month" id="start" required>
                <span class="validity m-0 p-0"></span>
            </div>
          </b-form-group>
          <b-button variant="outline-primary" type="submit">Guardar</b-button>
      </b-form>
  </div>
  </template>
<script>
export default {

}
</script>

<style>

</style>
