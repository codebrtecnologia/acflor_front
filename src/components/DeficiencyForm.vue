<template>
    <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Gerenciar Deficiencias</div>
        <form @submit.prevent="saveDeficiency" class="flex flex-col gap-4">
        <div class="field">
            <label class="label">Nome</label>
            <div class="control">
                <InputText v-model="deficiencyForm.name" class="input" type="text" placeholder="Nome" required />
            </div>
        </div>
        <div class="control">
            <Button class="button is-primary" type="submit">{{ isEditMode ? 'Atualizar' : 'Criar' }} Deficiencia</Button>
        </div>
        </form>
    </div>
</template>
  
<script>
    export default {
        props: {
            deficiencyForm: Object,
            isEditMode: Boolean,
        },
        emits: ['saveDeficiency'],
        methods: {
            saveDeficiency() {
            this.$emit('saveDeficiency');
            },
        },
    };
</script>

<style scoped>
    .field {
    margin-bottom: 1rem;
    }
</style>
  