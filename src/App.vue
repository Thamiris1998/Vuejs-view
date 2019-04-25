<template>
  <div id="app">
    <modal-funcionario id="modalFuncionarioCadastro" :title="'Cadastro Funcionário'"></modal-funcionario>
    <nav class="modal-header bg-primary">
      <span class="h1 navbar1">Sistema Funcionário</span>
      <button type="button" class="btn btn-light" @click="openModal()" style="position: absolute; right:90px;">
        <span class="fa fa-user-plus" aria-hidden="true"></span> Cadastrar</button>
    </nav>

    <div class="container-fluid mainContent">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <router-link to="/funcionario" class="nav-link"><i class="fa fa-user" aria-hidden="true"></i>
                        Funcionários
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bModalDirective from "bootstrap-vue/es/directives/modal/modal";
import ModalFuncionario from "./components/ModalFuncionario.vue";

export default {
  name: "App",
  components:{
    ModalFuncionario
  },
  directives:{
    "b-modal": bModalDirective
  },
  methods:{
    openModal() {
      this.$root.$emit("bv::show::modal", "modalFuncionarioCadastro");
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "./assets/css/style.css";
@import url(
  https://fonts.googleapis.com/css?family=Nunito:regular,
  900,
  700%7CNunito+Sans%7C
);
</style>
 