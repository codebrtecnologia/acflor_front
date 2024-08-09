import api from './api';

export default {
  async getDiciplines() {
    try {
      const response = await api.get('/diciplines');
      console.log("Response from API (getDiciplines):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
      throw error;
    }
  },

    async getDicipline() {
      try {
        const response = await api.get(`/diciplines/${dicipline.id}`, dicipline);
        console.log("Response from API (getDicipline):", response);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar disciplina:', error);
        throw error;
      }
    } ,

  async createDicipline(dicipline) {
    try {
      const response = await api.post('/diciplines', dicipline);
      console.log("Response from API (createDicipline):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar disciplina:', error);
      throw error;
    }
  },
  async updateDicipline(dicipline) {
    try {
      const response = await api.put(`/diciplines/${dicipline.id}`, dicipline);
      console.log("Response from API (updateDicipline):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar diciplina:', error);
      throw error;
    }
  },
  async deleteDicipline(diciplineId) {
    try {
      const response = await api.delete(`/diciplines/${diciplineId}`);
      console.log("Response from API (deleteDicipline):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar disciplina:', error);
      throw error;
    }
  },
  
};