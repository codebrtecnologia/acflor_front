import api from './api';

export default {
  async getCourses() {
    try {
      const response = await api.get('/courses');
      console.log("Response from API (getCourses):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      throw error;
    }
  },

    async getCourse() {
      try {
        const response = await api.get(`/courses/${course.id}`, course);
        console.log("Response from API (getCourse):", response);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar curso:', error);
        throw error;
      }
    } ,

  async createCourse(course) {
    try {
      const response = await api.post('/courses', course);
      console.log("Response from API (createCourse):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      throw error;
    }
  },
  async updateCourse(course) {
    try {
      const response = await api.put(`/courses/${course.id}`, course);
      console.log("Response from API (updateCourse):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      throw error;
    }
  },
  async deleteCourse(courseId) {
    try {
      const response = await api.delete(`/courses/${courseId}`);
      console.log("Response from API (deleteCourse):", response);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
      throw error;
    }
  },
  
};