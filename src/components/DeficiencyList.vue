<template>
    <Fluid>
      <div class="card flex flex-col gap-4 mt-8">
        <div class="font-semibold text-xl flex justify-between items-center">
          Lista de Deficiencia
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
            <tr v-for="deficiency in deficiencies" :key="deficiency.id">
              <td class="border px-4 py-2">{{ deficiency.name }}</td>
              <td class="border px-4 py-2">
                <Button @click="editDeficiency(deficiency)" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-sm mr-2"> </Button>
                <Button @click="deleteDeficiency(deficiency.id)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm"></Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para o formulário de Deficiencia -->
      <Dialog v-model:visible="showForm" :modal="true" :closable="false" :draggable="false" :style="{ width: '30vw' }">
        <DeficiencyForm
          :deficiencyForm="deficiencyForm"
          :isEditMode="isEditMode"
          @saveDeficiency="saveDeficiency"
        />
        <template #footer>
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeForm" />
        </template>
      </Dialog>
    </Fluid>
  </template>
  
  <script>
  import DeficiencyService from '@/service/DeficiencyService';
  import { ref, onMounted } from 'vue';
  import DeficiencyForm from './DeficiencyForm.vue';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  
  
  export default {
    components: {
      DeficiencyForm,
      Dialog,
      Button,
    },
    setup() {
  
      const deficiencies = ref([]);
      const deficiencyForm = ref({
        id: null,
        name: '',
      });
      const isEditMode = ref(false);
      const showForm = ref(false);
  
      const fetchDeficiencies = async () => {
        try {
          const response = await DeficiencyService.getDeficiencies();
          deficiencies.value = response.deficiencies;
        } catch (error) {
          console.error('Erro ao buscar deficiencias:', error);
        }
      };
  
      const saveDeficiency = async () => {
        try {
          if (isEditMode.value) {
            await DeficiencyService.updateDeficiency(deficiencyForm.value);
          } else {
            await DeficiencyService.createDeficiency(deficiencyForm.value);
          }
          resetForm();
          fetchDeficiencies();
          showForm.value = false; // Fechar o modal após salvar
        } catch (error) {
          console.error('Erro ao salvar deficiencia:', error);
        }
      };
  
      const editDeficiency = (deficiency) => {
        deficiencyForm.value = { ...deficiency };
        isEditMode.value = true;
        showForm.value = true; // Abrir o modal para edição
      };
  
      const deleteDeficiency = async (deficiencyId) => {
        try {
          await DeficiencyService.deleteDeficiency(deficiencyId);
          fetchDeficiencies();
        } catch (error) {
          console.error('Erro ao deletar deficiencia:', error);
        }
      };
  
      const resetForm = () => {
        deficiencyForm.value = {
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
        fetchDeficiencies();
      });
  
      return {
        deficiencies,
        deficiencyForm,
        isEditMode,
        showForm,
        saveDeficiency,
        editDeficiency,
        deleteDeficiency,
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