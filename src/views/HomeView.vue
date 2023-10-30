<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="6">
        <v-card class="pa-5">
          <v-card-title>Teste Vue</v-card-title>
          <v-card-subtitle>Sistema para informações de estado e suas cidades.</v-card-subtitle>
          <v-card-subtitle>(FONTE:IBGE)</v-card-subtitle>
          <v-row class="mt-5">
            <v-col xs="12" sm="12" md="6" lg="6">
              <v-select
                variant="outlined"
                v-model="selectedState"
                return-object
                :items="states"
                density="compact"
                label="Selecione um estado"
                @update:model-value="getCities"
                :item-title="item => item.nome"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="selectedState">
              <CardState
                v-if="cities && cities.length > 0"
                :stateImage="'https://servicodados.ibge.gov.br/api/v3/malhas/estados/'+selectedState.sigla"
                :stateName="selectedState.nome"
                :numCities="cities.length"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="cities && cities.length > 0">
              <h4 class="text-left">Tabela de cidades referente ao estado selecionado.</h4>
              <v-data-table
                :headers="headers"
                :items="cities"
                class="elevation-1 mt-5"
                max-height="700"
                item-value="name"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    size="small"
                    class="me-2"
                    @click="showModal(item)"
                  >
                    mdi-eye
                  </v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card>
        <v-dialog v-model="dialog" width="400">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-card-title>Município: {{selectedCity.nome}}</v-card-title>
                  <v-card-subtitle><b>Microrregiao:</b> {{selectedCity.microrregiao.nome}}</v-card-subtitle>
                  <v-card-subtitle><b>Mesorregiao:</b> {{selectedCity.microrregiao.mesorregiao.nome}}</v-card-subtitle>
                  <v-card-subtitle><b>Estado:</b> {{selectedCity.microrregiao.mesorregiao.UF.nome}}</v-card-subtitle>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <v-img
                  :width="200"
                  aspect-ratio="16/9"
                  cover 
                    :src="'https://servicodados.ibge.gov.br/api/v3/malhas/municipios/'+selectedCity.id"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ibgeService } from '@/services/ibge_service.js';
import CardState from '@/components/molecules/CardState.vue';

export default {
  name: 'HomeView',
  components: {
    CardState,
  },
  data() {
    return {
      selectedState: null,
      selectedCity: null,
      headers: [
        { title: 'ID', align: 'center', key: 'id' },
        { title: 'Município', align: 'center', key: 'nome' },
        { title: 'Ação', align: 'center', key: 'actions', sortable: false },
      ],
      states: [],
      cities: [],
      dialog: false,
    };
  },
  mounted() {
    this.getStates()
  },
  methods: {
    showModal(item) {
      this.dialog = true;
      this.selectedCity = item;
    },
    getStates() {
      ibgeService.getStates()
        .then(response => {
          this.states = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCities() {
      ibgeService.getCities(this.selectedState.sigla)
        .then(response => {
          this.cities = response;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
    
  },
};
</script>
<style lang="scss">
.v-data-table-footer{
  padding: 20px 10px !important;
}

</style>
