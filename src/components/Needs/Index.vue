<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card elevation="3">
          <v-card-title>
            <span>Preciso de ajuda!</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <need-dialog
              ref="needDialog"
              :need="editingNeed"
              :needs="needs"
              :editing="editing"
              @add:need="addNeed"
              @edit:need="editNeed"
              @set:editing-need="setEditingNeed"
            />
          </v-card-title>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="needs"
            :search="search"
            :loading="loading"
            loading-text="Buscando os dados..."
            @dblclick:row="clickRow"
          >
            <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
            <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editMode(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteNeed(item.id)">mdi-delete</v-icon>
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
import NeedDialog from "@/components/Needs/NeedDialog.vue";
import config from "../../configs/api";

export default {
  name: "needs-index",
  components: {
    NeedDialog,
  },
  data() {
    return {
      needs: [],
      search: "",
      loading: false,
      editing: false,
      success: false,
      successMessage: "",
      error: false,
      errorMessage: "",
      editingNeed: {},
      needObj: {
        id: null,
        title: "",
        summary: "",
        text: "",
        user_id: "",
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "Titulo", value: "title" },
        { text: "Resumo", value: "summary" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.editingNeed = Object.assign({}, this.needObj);
    this.$emit("update:pageTitle", "Preciso de ajuda!");
    this.getNeeds();
  },
  methods: {
    async getNeeds() {
      this.loading = true;
      let errorMessage = "Não foi possível buscar os dados 😞";
      try {
        const response = await fetch(
          config.address + "/needs"
        );
        if (response.ok) {
          const data = await response.json();
          const items = data["items"];
          for (var key in items) {
            this.needs = [
              ...this.needs,
              {
                id: items[key].id,
                title: items[key].title,
                summary: items[key].summary,
                text: items[key].text,
                user_id: items[key].user_id,
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
    editMode(need) {
      this.editingNeed = Object.assign({}, need);
      this.editing = true;
      this.$refs.needDialog.editing = true;
      this.$refs.needDialog.show();
    },
    addNeed(need) {
      this.editing = true;
      this.editNeed = need;
      this.needs = [...this.needs, need];
    },
    editNeed(id, data) {
      this.needs = this.needs.map((need) =>
        need.id === id ? data : need
      );
    },
    setEditingNeed(need) {
      this.editingNeed = Object.assign({}, need);
    },
    async deleteNeed(id) {
      let errorMessage = "Não foi possível executar a remoção 😞";
      this.loading = true;
      let apiAddress = config.address + '/needs/' + id;

      try {
        await fetch(apiAddress, {
          method: "DELETE",
        });
        this.needs = this.needs.filter(
          (need) => need.id !== id
        );
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
      this.editingNeed = Object.assign({}, this.needObj);
      this.editing = false;
      console.log(this.editingNeed);
      this.dialog = false;
    },
  },
};
</script>

<style>
.need-icon-text {
  padding-left: 5px;
}
</style>