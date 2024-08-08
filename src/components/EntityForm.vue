<template>
    <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Gerenciar Entities</div>
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
</template>
  
<script>
    export default {
        props: {
            entityForm: Object,
            isEditMode: Boolean,
        },
        emits: ['saveEntity'],
        methods: {
            saveEntity() {
            this.$emit('saveEntity');
            },
        },
    };
</script>

<style scoped>
    .field {
    margin-bottom: 1rem;
    }
</style>
  