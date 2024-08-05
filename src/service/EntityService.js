import api from './api';

export default {
  async getEntities() {
    try {
      const response = await api.get('/entities');
      console.log("Response from API (getEntities):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar entidades:', error);
      throw error;
    }
  },
  async createEntity(entity) {
    try {
      const response = await api.post('/entities', entity);
      console.log("Response from API (createEntity):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar entidade:', error);
      throw error;
    }
  },
  async updateEntity(entity) {
    try {
      const response = await api.put(`/entities/${entity.id}`, entity);
      console.log("Response from API (updateEntity):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar entidade:', error);
      throw error;
    }
  },
  async deleteEntity(entityId) {
    try {
      const response = await api.delete(`/entities/${entityId}`);
      console.log("Response from API (deleteEntity):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar entidade:', error);
      throw error;
    }
  },
};