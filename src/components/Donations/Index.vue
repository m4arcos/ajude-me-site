<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card elevation="3">
          <v-card-title>
            <span>Quero ajudar!</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <donation-dialog
              ref="donationDialog"
              :donation="editingDonation"
              :donations="donations"
              :editing="editing"
              @add:donation="addDonation"
              @edit:donation="editDonation"
              @set:editing-donation="setEditingDonation"
            />
          </v-card-title>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="donations"
            :search="search"
            :loading="loading"
            loading-text="Buscando os dados..."
            @dblclick:row="clickRow"
          >
            <v-alert v-if="success" type="success">{{ successMessage }}</v-alert>
            <v-alert v-if="error" type="error">{{ errorMessage }}</v-alert>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editMode(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteDonation(item.id)">mdi-delete</v-icon>
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
import DonationDialog from "@/components/Donations/DonationDialog.vue";
import config from "../../configs/api";

export default {
  name: "donations-index",
  components: {
    DonationDialog,
  },
  data() {
    return {
      donations: [],
      search: "",
      loading: false,
      editing: false,
      success: false,
      successMessage: "",
      error: false,
      errorMessage: "",
      editingDonation: {},
      donationObj: {
        id: null,
        title: "",
        summary: "",
        text: "",
        userId: "",
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
    this.editingDonation = Object.assign({}, this.donationObj);
    this.$emit("update:pageTitle", "Quero ajudar!");
    this.getDonations();
  },
  methods: {
    async getDonations() {
      this.loading = true;
      let errorMessage = "Não foi possível buscar os dados 😞";
      try {
        const response = await fetch(
          config.address + "/donations"
        );
        if (response.ok) {
          const data = await response.json();
          const items = data["items"];
          for (var key in items) {
            this.donations = [
              ...this.donations,
              {
                id: items[key].id,
                title: items[key].title,
                summary: items[key].summary,
                text: items[key].text,
                userId: items[key].user_id,
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
    editMode(donation) {
      this.editingDonation = Object.assign({}, donation);
      this.editing = true;
      this.$refs.donationDialog.editing = true;
      this.$refs.donationDialog.show();
    },
    addDonation(donation) {
      this.editing = true;
      this.editDonation = donation;
      this.donations = [...this.donations, donation];
    },
    editDonation(id, data) {
      this.donations = this.donations.map((donation) =>
        donation.id === id ? data : donation
      );
    },
    setEditingDonation(donation) {
      this.editingDonation = Object.assign({}, donation);
    },
    async deleteDonation(id) {
      let errorMessage = "Não foi possível executar a remoção 😞";
      this.loading = true;
      let apiAddress = config.address + '/donations/' + id;

      try {
        await fetch(apiAddress, {
          method: "DELETE",
        });
        this.donations = this.donations.filter(
          (donation) => donation.id !== id
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
      this.editingDonation = Object.assign({}, this.donationObj);
      this.editing = false;
      console.log(this.editingDonation);
      this.dialog = false;
    },
  },
};
</script>

<style>
.donation-icon-text {
  padding-left: 5px;
}
</style>