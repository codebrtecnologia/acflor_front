<template>
  <Fluid>
    <div class="card flex flex-col gap-4 mt-8">
      <div class="font-semibold text-xl flex justify-between items-center">
        Lista de Entidades
        <Button @click="openForm" icon="pi pi-plus" class="p-button-rounded p-button-success p-button-sm">
          
        </Button>
      </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Nome</th>
            <th class="px-4 py-2">Responsável</th>
            <th class="px-4 py-2">Telefone</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entity in entities" :key="entity.id">
            <td class="border px-4 py-2">{{ entity.name }}</td>
            <td class="border px-4 py-2">{{ entity.responsible }}</td>
            <td class="border px-4 py-2">{{ entity.telephone }}</td>
            <td class="border px-4 py-2">{{ entity.email }}</td>
            <td class="border px-4 py-2">
              <Button @click="editEntity(entity)" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-sm mr-2"> </Button>
              <Button @click="deleteEntity(entity.id)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-sm"></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para o formulário de Entity -->
    <Dialog header="Gerenciar Entity" v-model:visible="showForm" :modal="true" :closable="false" :draggable="false" :style="{ width: '30vw' }">
      <EntityForm
        :entityForm="entityForm"
        :isEditMode="isEditMode"
        @saveEntity="saveEntity"
      />
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeForm" />
      </template>
    </Dialog>
  </Fluid>
</template>

<script>
import EntityService from '@/service/EntityService';
import { ref, onMounted } from 'vue';
import EntityForm from './EntityForm.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


export default {
  components: {
    EntityForm,
    Dialog,
    Button,
  },
  setup() {

    const entities = ref([]);
    const entityForm = ref({
      id: null,
      name: '',
      responsible: '',
      telephone: '',
      email: '',
    });
    const isEditMode = ref(false);
    const showForm = ref(false);

    const fetchEntities = async () => {
      try {
        const response = await EntityService.getEntities();
        entities.value = response.entities;
      } catch (error) {
        console.error('Erro ao buscar entidades:', error);
      }
    };

    const saveEntity = async () => {
      try {
        if (isEditMode.value) {
          await EntityService.updateEntity(entityForm.value);
        } else {
          await EntityService.createEntity(entityForm.value);
        }
        resetForm();
        fetchEntities();
        showForm.value = false; // Fechar o modal após salvar
      } catch (error) {
        console.error('Erro ao salvar entidade:', error);
      }
    };

    const editEntity = (entity) => {
      entityForm.value = { ...entity };
      isEditMode.value = true;
      showForm.value = true; // Abrir o modal para edição
    };

    const deleteEntity = async (entityId) => {
      try {
        await EntityService.deleteEntity(entityId);
        fetchEntities();
      } catch (error) {
        console.error('Erro ao deletar entidade:', error);
      }
    };

    const resetForm = () => {
      entityForm.value = {
        id: null,
        name: '',
        responsible: '',
        telephone: '',
        email: '',
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
      fetchEntities();
    });

    return {
      entities,
      entityForm,
      isEditMode,
      showForm,
      saveEntity,
      editEntity,
      deleteEntity,
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
