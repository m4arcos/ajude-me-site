<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card elevation="3">
          <v-card-title>
            <span>ONGs</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <ong-dialog
              ref="ongDialog"
              :ong="editingOng"
              :ongs="ongs"
              :editing="editing"
              @add:ong="addOng"
              @edit:ong="editOng"
              @set:editing-ong="setEditingOng"
            />
          </v-card-title>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="ongs"
            :search="search"
            :loading="loading"
            loading-text="Buscando os dados..."
            @dblclick:row="clickRow"
          >
            <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
            <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editMode(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteOng(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="success" color="success" :timeout="7500" elevation="3" top right>
      {{ successMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="success = false">Fechar</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="error" :timeout="7500" elevation="3" top right>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import OngDialog from "@/components/Ongs/OngDialog.vue";
import config from "../../configs/api";

export default {
  name: "ongs-index",
  components: {
    OngDialog,
  },
  data() {
    return {
      ongs: [],
      search: "",
      loading: false,
      editing: false,
      success: false,
      successMessage: "",
      error: false,
      errorMessage: "",
      editingOng: {},
      ongObj: {
        id: null,
        name: "",
        owner: "",
        mail: "",
        phone: "",
        cellphone: "",
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "name" },
        { text: "Responsável", value: "owner" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.editingOng = Object.assign({}, this.ongObj);
    this.$emit("update:pageTitle", "ONGs");
    this.getOngs();
  },
  methods: {
    async getOngs() {
      this.loading = true;
      let errorMessage = "Não foi possível buscar os dados 😞";
      try {
        const response = await fetch(config.address + "/ongs");
        if (response.ok) {
          const data = await response.json();
          const items = data["items"];
          for (var key in items) {
            this.ongs = [
              ...this.ongs,
              {
                id: items[key].id,
                name: items[key].name,
                owner: items[key].owner,
                mail: items[key].mail,
                phone: items[key].phone,
                cellphone: items[key].cellphone,
              },
            ];
          }
        } else {
          this.errorMessage = errorMessage;
          this.error = true;
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.errorMessage = errorMessage;
        this.error = true;
      }
    },

    clickRow(row) {
      console.log(row);
    },

    editMode(ong) {
      this.editingOng = Object.assign({}, ong);
      this.editing = true;
      this.$refs.ongDialog.editing = true;
      this.$refs.ongDialog.show();
    },

    addOng(ong) {
      this.editing = true;
      this.editOng = ong;
      this.ongs = [...this.ongs, ong];
    },
    
    editOng(id, data) {
      this.ongs = this.ongs.map((ong) => (ong.id === id ? data : ong));
    },

    setEditingOng(ong) {
      this.editingOng = Object.assign({}, ong);
    },

    async deleteOng(id) {
      let errorMessage = "Não foi possível executar a remoção 😞";
      this.loading = true;
      let apiAddress = config.address + '/ongs/' + id;

      try {
        await fetch(apiAddress, {
          method: "DELETE",
        });
        this.ongs = this.ongs.filter((ong) => ong.id !== id);
        this.loading = false;
        this.successMessage = "Removido com sucesso 😁";
        this.success = true;
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.errorMessage = errorMessage;
        this.error = true;
      }
    },

    closeDialog() {
      this.success = false;
      this.successMessage = "";
      this.error = false;
      this.errorMessage = "";
      this.editingOng = Object.assign({}, this.ongObj);
      this.editing = false;
      console.log(this.editingOng);
      this.dialog = false;
    },
  },
};
</script>

<style>
.ong-icon-text {
  padding-left: 5px;
}
</style>