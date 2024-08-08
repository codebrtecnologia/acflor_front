<template>
    <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Gerenciar Cursos</div>
        <form @submit.prevent="saveCourse" class="flex flex-col gap-4">
        <div class="field">
            <label class="label">Nome</label>
            <div class="control">
                <InputText v-model="courseForm.name" class="input" type="text" placeholder="Nome" required />
            </div>
        </div>
        <div class="control">
            <Button class="button is-primary" type="submit">{{ isEditMode ? 'Atualizar' : 'Criar' }} Curso</Button>
        </div>
        </form>
    </div>
</template>
  
<script>
    export default {
        props: {
            courseForm: Object,
            isEditMode: Boolean,
        },
        emits: ['saveCourse'],
        methods: {
            saveCourse() {
            this.$emit('saveCourse');
            },
        },
    };
</script>

<style scoped>
    .field {
    margin-bottom: 1rem;
    }
</style>
  