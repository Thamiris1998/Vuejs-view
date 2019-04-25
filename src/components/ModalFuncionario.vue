<template>
  <b-modal
    :id="id"
    :title="title"
    header-bg-variant="primary"
    size="lg"
    @shown="getFunctionaryId()"
  >
    <loading-spinner v-bind:loading="loading"></loading-spinner>
    <form class="needs-validation">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Nome</label>
            <input
              v-model="$v.model.nome.$model"
              type="text"
              :class="valid($v.model.nome)"
              placeholder="Nome"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Idade</label>
            <input
              v-model="$v.model.idade.$model"
              type="text"
              :class="valid($v.model.idade)"
              placeholder="Idade"
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Cargo</label>
            <input
              v-model="$v.model.cargo.$model"
              type="text"
              :class="valid($v.model.cargo)"
              placeholder="Cargo"
            >
          </div>
        </div>
      </div>
    </form>
    <div slot="modal-footer">
      <button type="button" class="btn btn-primary mr-3" @click="save()" :disabled="$v.$invalid">Salvar</button>
      <button type="button" class="btn btn-secondary" @click="closeModal()">Sair</button>
    </div>
  </b-modal>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import bModal from "bootstrap-vue/es/components/modal/modal";
import LoadingSpinner from "../components/Spinner.vue";
import Swal from "sweetalert2";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

export default {
  name: "modal-funcionario",
  components: {
    "b-modal": bModal,
    LoadingSpinner
  },
  props: {
    id: String,
    funcionario: Object,
    title: String
  },
  data() {
    return {
      model: {
        id: "",
        nome: "",
        cargo: "",
        idade: ""
      },
      loading: false
    };
  },
  validations: {
    model: {
      nome: {
        minLength: minLength(4),
        required
      },
      cargo: {
        minLength: minLength(4),
        required
      },
      idade: {
        required,
        maxLength: maxLength(2)
      }
    }
  },
  mounted() {
    this.$v.$touch();
  },
  methods: {
    valid(validation) {
      return { error: validation.$error, dirty: validation.$dirty };
    },
    getFunctionaryId() {
      if (this.funcionario != null) {
        this.loading = true;
        axios
          .get(`${process.env.VUE_APP_FUNCTIONARY}/findById/${this.funcionario.id}`)
          .then(result => {
            const data = result.data;
            this.model = data;
            this.loading = false;
          });
      }
    },
    save() {
      if (this.funcionario == null) {
        this.loading = true;
        axios
          .post(`${process.env.VUE_APP_FUNCTIONARY}/save`, {
            nome: this.model.nome,
            cargo: this.model.cargo,
            idade: this.model.idade
          })
          .then(response => {
            if (response.data.result == true) {
              Swal({
                title: response.data.text,
                type: "success",
                cancelButtonText: "Sair"
              });
              this.closeModal();
            }
          })
          .finally(() => (this.loading = false));
      } else if (this.funcionario != null) {
        this.loading = true;
        axios
          .put(`${process.env.VUE_APP_FUNCTIONARY}/update/${this.model.id}`, {
            nome: this.model.nome,
            cargo: this.model.cargo,
            idade: this.model.idade
          })
          .then(response => {
            if (response.data.result == true) {
              Swal({
                title: response.data.text,
                type: "success",
                cancelButtonText: "Sair"
              });
              this.closeModal();
            }
          })
          .finally(() => (this.loading = false));
      }
    },
    closeModal() {
      this.$root.$emit("bv::hide::modal", this.id);
    }
  }
};
</script>
<style>
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.dirty {
  background: #fff;
}

.error {
  border-color: red;
}
</style>
