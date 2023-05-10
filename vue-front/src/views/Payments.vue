<template>
    <div class="screen">
        <div class="row" id="grid-top-log">
            <NavBarPresident id="full"></NavBarPresident>
        </div>
        <div class="row" id="grid-top">
            <div class="row" id="topR">
            <div class="col-sm-1" id="full">
                <button class="btn btn-sm btn-primary" id="profileButton" @click="$router.push('/login')">Volver</button>
            </div>
            <div class="col-sm-11" id="full">
                <span class="title"><b>Mis Pagos</b></span>
            </div>
            </div>
            <div class="row" id="bottomR">
                <div class="col-sm-1" id="full">
                </div>
                <div class="col-sm-11" id="full">
                    <div class="container">
                        <div class="container" id="tableee">
                            <b-table
                            class="m-5 "
                            style="overflow-y:auto; height: 60vh !important;"
                            ref="payTable"
                            id="payTable"
                            :fields="headers"
                            :items="payments"
                            responsive="sm">
                            <template #cell(d_bill)="data">
                                {{ data.item.d_bill | formatDate}}
                            </template>
                            <template #cell(d_payment)="data">
                                {{ data.item.d_payment | formatDateP}}
                            </template>
                            <template #cell(description)="data">
                            {{ data.item.description | formatDescription}}
                            </template>
                            <template #cell(amount)="data">
                                {{ data.item.amount | formatAmount}}
                                </template>
                            <template #cell(type_bill)="data">
                                {{ data.item.type_bill | formatBill}}
                            </template>
                            </b-table>
                        </div>
                        <b-button @click="print()">IMPRIMIR PAGOS</b-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="grid-bottom-home">
            <Footer id="full"></Footer>
        </div>
    </div>
</template>

            <!-- <div class="col-8" id="full">
                <div class="container">
                    <h3 class="mt-5 mb-0 pb-0">Pagos</h3>
                    <b-table
                    class="m-5 "
                    style="overflow-y:auto; height: 60vh !important;"
                    ref="debsTable"
                    id="debsTable"
                    :fields="headers"
                    :items="payments"
                    responsive="sm">
                    <template #cell(date_p)="data">
                        {{ data.item.date_p | formatDate}}
                    </template>
                    <template #cell(amount)="data">
                        {{ data.item.amount | formatAmount}}
                        </template>
                    <template #cell(type_bill)="data">
                        {{ data.item.type_bill | formatBill}}
                    </template>
                    <template #cell(options)="data">
                        <b-button class="btn btn-success" v-b-tooltip.hover title="Pagar" @click="openPay(data.item)">
                            <font-awesome-icon icon="fa-solid fa-money-check-alt" />
                        </b-button>
                        </template>
                    </b-table>
                </div>
            </div> -->
<script>
import NavBarPresident from '../components/NavBarPresident.vue'
import NavBarOwner from '../components/NavBarOwner.vue'
import Footer from '../components/FooterSocialNetwork.vue'
import Services from '../services/servicesDB'
export default {
  data: () => ({
    role: null,
    fd_id: null,
    dataUserLogin: {},
    payments: [],
    headers: [
      { key: 'amount', sortable: true, label: 'Cantidad', tdClass: 'table-title', thClass: 'table-title' },
      { key: 'type_bill', label: 'Tipo de gasto' },
      { key: 'is_spill', label: 'Tipo de gasto' },
      { key: 'description', label: 'Descripción' },
      { key: 'd_payment', sortable: true, label: 'Fecha de pago' },
      { key: 'd_deb', sortable: true, label: 'Fecha de deuda' }
    ]
  }),
  components: {
    NavBarPresident,
    NavBarOwner,
    Footer
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.dataUserLogin = JSON.parse(localStorage.getItem('userLogin'))
      this.role = this.dataUserLogin.role_id
      const array = await Services.findAllDebsAllIds(this.dataUserLogin)
      const records = array.data.dataResponse
      for (let id of records) {
        Services.findPayment(id).then(
          Response => {
            this.payments.push(Response.data[0])
          },
          Error => {
            console.log('Error al buscar datos de deudas')
          }
        )
      }
    },
    print () {
      var contenido = document.getElementById('tableee').innerHTML
      var contenidoOriginal = document.body.innerHTML

      document.body.innerHTML = contenido

      window.print()

      document.body.innerHTML = contenidoOriginal
    }
  }
}

</script>
