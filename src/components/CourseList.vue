<template>
    <Fluid>
      <div class="card flex flex-col gap-4 mt-8">
        <div class="font-semibold text-xl flex justify-between items-center">
          Lista de Curso
          <Button @click="openForm" icon="pi pi-plus" class="p-button-rounded p-button-success p-button-sm">
            
          </Button>
        </div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.id">
              <td class="border px-4 py-2">{{ course.name }}</td>
              <td class="border px-4 py-2">
                <Button @click="editCourse(course)" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-sm mr-2"> </Button>
                <Button @click="deleteCourse(course.id)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm"></Button>
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
  import CourseService from '@/service/CourseService';
  import { ref, onMounted } from 'vue';
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
  </style>