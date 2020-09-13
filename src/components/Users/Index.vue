<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card elevation="3">
          <v-card-title>
            <span>Usuários</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <user-dialog
              ref="userDialog"
              :user="editingUser"
              :users="users"
              :editing="editing"
              @add:user="addUser"
              @edit:user="editUser"
              @set:editing-user="setEditingUser"
            />
          </v-card-title>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="users"
            :search="search"
            :loading="loading"
            loading-text="Buscando os dados..."
            @dblclick:row="clickRow"
          >
            <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
            <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editMode(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
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
import UserDialog from "@/components/Users/UserDialog.vue";
export default {
  name: "users-index",
  components: {
    UserDialog,
  },
  data() {
    return {
      users: [],
      search: "",
      loading: false,
      editing: false,
      success: false,
      successMessage: "",
      error: false,
      errorMessage: "",
      editingUser: {},
      userObj: {
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
    this.editingUser = Object.assign({}, this.userObj);
    this.$emit("update:pageTitle", "Usuários");
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.loading = true;
      let errorMessage = "Não foi possível buscar os dados 😞";
      try {
        const response = await fetch("http://localhost:8080/mocks/users.json");
        if (response.ok) {
          const data = await response.json();
          const items = data["items"];
          for (var key in items) {
            this.users = [
              ...this.users,
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

    editMode(user) {
      this.editingUser = Object.assign({}, user);
      this.editing = true;
      this.$refs.userDialog.editing = true;
      this.$refs.userDialog.show();
    },

    addUser(user) {
      this.editing = true;
      this.editUser = user;
      this.users = [...this.users, user];
    },
    
    editUser(id, data) {
      this.users = this.users.map((user) => (user.id === id ? data : user));
    },

    setEditingUser(user) {
      this.editingUser = Object.assign({}, user);
    },

    async deleteUser(id) {
      let errorMessage = "Não foi possível executar a remoção 😞";
      this.loading = true;
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE",
        });
        this.users = this.users.filter((user) => user.id !== id);
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
      this.editingUser = Object.assign({}, this.userObj);
      this.editing = false;
      console.log(this.editingUser);
      this.dialog = false;
    },
  },
};
</script>

<style>
.user-icon-text {
  padding-left: 5px;
}
</style>