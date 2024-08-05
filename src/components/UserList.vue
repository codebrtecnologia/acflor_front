<template>
  <div>
    <h1>Gerenciar Usuários</h1>
    <form @submit.prevent="saveUser">
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input v-model="userForm.name" class="input" type="text" placeholder="Nome" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input v-model="userForm.email" class="input" type="email" placeholder="Email" required />
        </div>
      </div>
      <div class="field">
        <label class="label">Idade</label>
        <div class="control">
          <input v-model="userForm.age" class="input" type="number" placeholder="Idade" required />
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" type="submit">{{ isEditMode ? 'Atualizar' : 'Criar' }} Usuário</button>
      </div>
    </form>
    <h2 class="title">Lista de Usuários</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="editUser(user)" class="button is-small is-info">Editar</button>
        <button @click="deleteUser(user.id)" class="button is-small is-danger">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from '@/service/UserService';

export default {
  data() {
    return {
      users: [],
      userForm: {
        id: null,
        name: '',
        email: '',
        age: '',
      },
      isEditMode: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const users = await UserService.getUsers();
        this.users = users;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    async saveUser() {
      try {
        if (this.isEditMode) {
          await UserService.updateUser(this.userForm);
        } else {
          await UserService.createUser(this.userForm);
        }
        this.resetForm();
        this.fetchUsers();
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    },
    editUser(user) {
      this.userForm = { ...user };
      this.isEditMode = true;
    },
    async deleteUser(userId) {
      try {
        await UserService.deleteUser(userId);
        this.fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
      }
    },
    resetForm() {
      this.userForm = { id: null, name: '', email: '', age: '' };
      this.isEditMode = false;
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>