import api from './api';

export default {
  async getDeficiencies() {
    try {
      const response = await api.get('/deficiencies');
      console.log("Response from API (getDeficiencies):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Deficiencias:', error);
      throw error;
    }
  },

    async getDeficiency() {
      try {
        const response = await api.get(`/deficiencies/${deficiency.id}`, deficiency);
        console.log("Response from API (getDeficiency):", response);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar Deficiencia:', error);
        throw error;
      }
    } ,

  async createDeficiency(deficiency) {
    try {
      const response = await api.post('/deficiencies', deficiency);
      console.log("Response from API (createDeficiency):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar deficiencia:', error);
      throw error;
    }
  },
  async updateDeficiency(deficiency) {
    try {
      const response = await api.put(`/deficiencies/${deficiency.id}`, deficiency);
      console.log("Response from API (updateDeficiency):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar deficiencia:', error);
      throw error;
    }
  },
  async deleteDeficiency(deficiencyId) {
    try {
      const response = await api.delete(`/deficiencies/${deficiencyId}`);
      console.log("Response from API (deleteDeficiency):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar deficiencia:', error);
      throw error;
    }
  },
  
};