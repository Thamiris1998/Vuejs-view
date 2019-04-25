<template>
  <div>
    <loading-spinner v-bind:loading="loading"></loading-spinner>
    <modal-funcionario
      id="modalFuncionarioEditar"
      :title="'Editar Funcionário'"
      v-bind:funcionario="itemSelected"
    ></modal-funcionario>

    <v-client-table :columns="columns" :options="options" :data="data">
      <div slot="nome" slot-scope="props" class="bis">{{props.row.nome}}</div>

      <div slot="cargo" slot-scope="props" class="bis">{{props.row.cargo}}</div>

      <div slot="idade" slot-scope="props">{{props.row.idade}}</div>

      <div slot="editar" slot-scope="props">
        <div>
          <button type="button" class="btn btn-warning" @click="alterModal(props.row)">Editar</button>
        </div>
      </div>

      <div slot="excluir" slot-scope="props">
        <div>
          <button type="button" class="btn btn-danger" @click="exclude(props.row)">Excluir</button>
        </div>
      </div>
    </v-client-table>
  </div>
</template>

<script>
import Vue from "vue";
import bModalDirective from "bootstrap-vue/es/directives/modal/modal";
import axios from "axios";
import LoadingSpinner from "../components/Spinner.vue";
import ModalFuncionario from "../components/ModalFuncionario.vue";
import Swal from "sweetalert2";
import { ClientTable } from "vue-tables-2";
Vue.use(ClientTable);


export default {
  name: "Funcionario",
  components: {
    LoadingSpinner,
    ModalFuncionario
  },
  directives: {
    "b-modal": bModalDirective
  },
  data() {
    return {
      loading: false,
      data: [],
      itemSelected: {},
      searchItem: "",
      columns: ["nome", "idade", "cargo", "editar", "excluir"],
      options: {
        texts: {
          count:
            "Mostrando de {from} a {to} total {count} resultados|{count} resultados|Um resultado",
          filter: "Pesquisar:",
          filterPlaceholder: "Nome, idade, cargo",
          limit: "Resultados:",
          page: "Página:",
          noResults: "Não há resultados",
          filterBy: "Filtrar por {column}",
          loading: "Carregando..."
        },
        sortIcon: {
          base: "fa",
          up: "fa-sort-asc",
          down: "fa-sort-desc",
          is: "fa-sort"
        },
        uniqueKey: "key",
        responseAdapter({ data }) {
          return {
            data,
            count: data.length
          };
        },
        headings: {
          nome: "Nome",
          idade: "Idade",
          cargo: "Cargo",
          editar: "Editar",
          excluir: "Excluir"
        },
        sortable: ["nome", "idade", "cargo"],
        perPageValues: [],
        perPage: 30,
        customSorting: {
          nome: function(ascending) {
            return function(a, b) {
              const v1 = a ? a.nome : 0;
              const v2 = b ? b.nome : 0;
              if (ascending) {
                return v1 <= v2 ? 1 : -1;
              } else {
                return v1 >= v2 ? 1 : -1;
              }
            };
          }
        }
      }
    };
  },
  created() {
    this.getFunctionaryAll();
  },
  mounted() {
    this.$root.$on("bv::modal::hidden", bvEvent => {
      if (bvEvent.type == "hidden") {
        this.getFunctionaryAll();
      }
    });
  },
  methods: {
    getFunctionaryAll() {
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_FUNCTIONARY}/findAll`)
        .then(response => {
          this.loading = false;
          this.data = response.data;
        })
        .finally(() => (this.loading = false));
    },
    setSelectedItem(item) {
      this.itemSelected = item;
    },
    alterModal(item) {
      this.setSelectedItem(item);
      this.$root.$emit("bv::show::modal", "modalFuncionarioEditar");
    },
    exclude(item) {
      axios
        .delete(`${process.env.VUE_APP_FUNCTIONARY}/delete/${item.id}`)
        .then(response => {
          if (response.data.result == true) {
            Swal({
              title: response.data.text,
              type: "success",
              cancelButtonText: "Sair"
            });
          }
        })
        .finally(() => this.getFunctionaryAll());
    }
  }
};
</script>