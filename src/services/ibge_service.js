import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(Axios);

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

export const ibgeService = {
    async getStates () {
        try {
            const response = await axios.get(BASE_URL + '/estados');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getCities (stateId) {
        try {
            const response = await axios.get(`${BASE_URL}/estados/${stateId}/municipios`);
            return response.data;
        } catch (error) {
            alert('Erro ao buscar cidades');
            console.error(error);

        }
    },
    
};
