<template>
    <Fluid>
      <div class="card flex flex-col gap-4 mt-8">
        <div class="font-semibold text-xl flex justify-between items-center">
          Lista de Disciplinas
          <Button @click="openForm" icon="pi pi-plus" class="p-button-rounded p-button-success p-button-sm">
            
          </Button>
        </div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Code</th>
              <th class="px-4 py-2">Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" dicipline in diciplines" :key="dicipline.id">
              <td class="border px-4 py-2">{{ dicipline.code }}</td>
              <td class="border px-4 py-2">{{ dicipline.name }}</td>
              <td class="border px-4 py-2">
                <Button @click="editDicipline(dicipline)" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-sm mr-2"> </Button>
                <Button @click="deleteDicipline(dicipline.id)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm"></Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para o formulário de Disciplina -->
      <Dialog v-model:visible="showForm" :modal="true" :closable="false" :draggable="false" :style="{ width: '30vw' }">
        <DiciplineForm
          :diciplineForm="diciplineForm"
          :isEditMode="isEditMode"
          @saveDicipline="saveDicipline"
        />
        <template #footer>
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeForm" />
        </template>
      </Dialog>
    </Fluid>
  </template>
  
  <script>
  import DiciplineService from '@/service/DiciplineService';
  import { ref, onMounted } from 'vue';
  import DiciplineForm from './DiciplineForm.vue';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  
  
  export default {
    components: {
      DiciplineForm,
      Dialog,
      Button,
    },
    setup() {
  
      const diciplines = ref([]);
      const diciplineForm = ref({
        id: null,
        code: '',
        name: '',
      });
      const isEditMode = ref(false);
      const showForm = ref(false);
  
      const fetchDiciplines = async () => {
        try {
          const response = await DiciplineService.getDiciplines();
          diciplines.value = response.diciplines;
        } catch (error) {
          console.error('Erro ao buscar disciplinas:', error);
        }
      };
  
      const saveDicipline = async () => {
        try {
          if (isEditMode.value) {
            await DiciplineService.updateDicipline(diciplineForm.value);
          } else {
            await DiciplineService.createDicipline(diciplineForm.value);
          }
          resetForm();
          fetchDiciplines();
          showForm.value = false; // Fechar o modal após salvar
        } catch (error) {
          console.error('Erro ao salvar disciplina:', error);
        }
      };
  
      const editDicipline = (dicipline) => {
        diciplineForm.value = { ...dicipline };
        isEditMode.value = true;
        showForm.value = true; // Abrir o modal para edição
      };
  
      const deleteDicipline = async (diciplineId) => {
        try {
          await DiciplineService.deleteDicipline(diciplineId);
          fetchDiciplines();
        } catch (error) {
          console.error('Erro ao deletar disciplina:', error);
        }
      };
  
      const resetForm = () => {
        diciplineForm.value = {
          id: null,
          code: '',
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
        fetchDiciplines();
      });
  
      return {
        diciplines,
        diciplineForm,
        isEditMode,
        showForm,
        saveDicipline,
        editDicipline,
        deleteDicipline,
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