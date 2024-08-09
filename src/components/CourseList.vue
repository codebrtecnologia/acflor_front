<template>
    <Fluid>
      <div class="card flex flex-col gap-4 mt-8">
        <Toolbar class="mb-6">
          <template #start>
            <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openForm" />
          </template>
  
          <template #end>
            <Button label="Export" icon="pi pi-upload" severity="success" @click="exportCSV" />
          </template>
        </Toolbar>
  
        <div class="font-semibold text-xl flex justify-between items-center">
          Lista de Curso
   
        </div>
        <table class="table-auto w-full custom-table">
          <thead>
            <tr>
              <th class="px-4 py-2">Nome</th>
              <th class="px-4 py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.id">
              <td class="px-4 py-2">{{ course.name }}</td>
              <td class="px-4 py-2 text-right">
                <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editCourse(course)" />
                <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteCourse(course.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para o formulário de Curso -->
      <Dialog v-model:visible="showForm" :modal="true" :closable="false" :draggable="false" :style="{ width: '30vw' }">
        <CourseForm
          :courseForm="courseForm"
          :isEditMode="isEditMode"
          @saveCourse="saveCourse"
        />
        <template #footer>
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeForm" />
        </template>
      </Dialog>
    </Fluid>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import CourseService from '@/service/CourseService';
  import CourseForm from './CourseForm.vue';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  
  export default {
    components: {
      CourseForm,
      Dialog,
      Button,
    },
    setup() {
      const courses = ref([]);
      const courseForm = ref({
        id: null,
        name: '',
      });
      const isEditMode = ref(false);
      const showForm = ref(false);
  
      const fetchCourses = async () => {
        try {
          const response = await CourseService.getCourses();
          courses.value = response.courses;
        } catch (error) {
          console.error('Erro ao buscar cursos:', error);
        }
      };
  
      const saveCourse = async () => {
        try {
          if (isEditMode.value) {
            await CourseService.updateCourse(courseForm.value);
          } else {
            await CourseService.createCourse(courseForm.value);
          }
          resetForm();
          fetchCourses();
          showForm.value = false; // Fechar o modal após salvar
        } catch (error) {
          console.error('Erro ao salvar entidade:', error);
        }
      };
  
      const editCourse = (course) => {
        courseForm.value = { ...course };
        isEditMode.value = true;
        showForm.value = true; // Abrir o modal para edição
      };
  
      const deleteCourse = async (courseId) => {
        try {
          await CourseService.deleteCourse(courseId);
          fetchCourses();
        } catch (error) {
          console.error('Erro ao deletar curso:', error);
        }
      };
  
      const exportCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
          + courses.value.map(c => c.name).join("\n");
  
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, "courses.csv");
      };
  
      const resetForm = () => {
        courseForm.value = {
          id: null,
          name: '',
        };
        isEditMode.value = false;
      };
  
      const openForm = () => {
        resetForm();
        showForm.value = true;
      };
  
      const closeForm = () => {
        showForm.value = false;
      };
  
      onMounted(() => {
        fetchCourses();
      });
  
      return {
        courses,
        courseForm,
        isEditMode,
        showForm,
        saveCourse,
        editCourse,
        deleteCourse,
        exportCSV, // Certifique-se de retornar a função exportCSV aqui
        resetForm,
        openForm,
        closeForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .field {
    margin-bottom: 1rem;
  }
  
  .custom-table {
    border-collapse: collapse;
    width: 100%;
  }
  
  .custom-table th, .custom-table td {
    border-bottom: 1px solid #ddd;
  }
  
  .custom-table th {
    text-align: left;
  }
  
  .custom-table td {
    border-right: none;
    border-left: none;
  }
  </style>
  