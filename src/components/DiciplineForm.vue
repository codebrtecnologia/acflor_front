<template>
    <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Gerenciar Disciplinas</div>
        <form @submit.prevent="saveDicipline" class="flex flex-col gap-4">
        <div class="field">
            <label class="label">Code</label>
            <div class="control">
                <InputText v-model="diciplineForm.code" class="input" type="text" placeholder="Code" required />
            </div>
            <label class="label">Nome</label>
            <div class="control">
                <InputText v-model="diciplineForm.name" class="input" type="text" placeholder="Nome" required />
            </div>
        </div>
        <div class="control">
            <Button class="button is-primary" type="submit">{{ isEditMode ? 'Atualizar' : 'Criar' }} Disciplina</Button>
        </div>
        </form>
    </div>
</template>
  
<script>
    export default {
        props: {
            diciplineForm: Object,
            isEditMode: Boolean,
        },
        emits: ['saveDicipline'],
        methods: {
            saveDicipline() {
            this.$emit('saveDicipline');
            },
        },
    };
</script>

<style scoped>
    .field {
    margin-bottom: 1rem;
    }
</style>
  