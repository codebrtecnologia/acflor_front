<template>
  <Fluid>
    <div class="card flex flex-col gap-4">
      <div class="font-semibold text-xl">Gerenciar Entidades</div>
      <form @submit.prevent="saveEntity" class="flex flex-col gap-4">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <InputText v-model="entityForm.name" class="input" type="text" placeholder="Nome" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Responsável</label>
          <div class="control">
            <InputText v-model="entityForm.responsible" class="input" type="text" placeholder="Responsável" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Telefone</label>
          <div class="control">
            <InputText v-model="entityForm.telephone" class="input" type="text" placeholder="Telefone" required />
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <InputText v-model="entityForm.email" class="input" type="email" placeholder="Email" required />
          </div>
        </div>
        <div class="control">
          <Button class="button is-primary" type="submit">{{ isEditMode ? 'Atualizar' : 'Criar' }} Entidade</Button>
        </div>
      </form>
    </div>
    
    <div class="card flex flex-col gap-4 mt-8">
      <div class="font-semibold text-xl">Lista de Entidades</div>
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
  </Fluid>
</template>

<script>
import EntityService from '@/service/EntityService';
import { ref, onMounted, watch } from 'vue';

export default {
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

    const fetchEntities = async () => {
      try {
        console.log('Fetching entities...');
        const response = await EntityService.getEntities();
        console.log('Response data:', response); 
        entities.value = response.entities; 
        console.log('Entities state:', entities.value);
      } catch (error) {
        console.error('Erro ao buscar entidades:', error);
      }
    };

    const saveEntity = async () => {
      console.log('Salvando entidade:', entityForm.value);
      try {
        if (isEditMode.value) {
          await EntityService.updateEntity(entityForm.value);
        } else {
          await EntityService.createEntity(entityForm.value);
        }
        resetForm();
        fetchEntities();
      } catch (error) {
        console.error('Erro ao salvar entidade:', error);
      }
    };

    const editEntity = (entity) => {
      console.log('Editando entidade:', entity); 
      entityForm.value = { ...entity };
      isEditMode.value = true;
    };

    const deleteEntity = async (entityId) => {
      console.log('Deletando entidade com ID:', entityId); 
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
      console.log('Formulário resetado'); 
    };

    onMounted(() => {
      fetchEntities();
    });

    watch(entities, (newEntities) => {
      console.log('Entities updated in watch:', newEntities);
    });

    return {
      entities,
      entityForm,
      isEditMode,
      saveEntity,
      editEntity,
      deleteEntity,
      resetForm,
    };
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>