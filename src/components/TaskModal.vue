<script setup lang="js">
import { ref, watch, toRefs } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps({
  open: Boolean,
  task: Object,
  users: Array,
  tags: Array,
  priorities: Array,
});

const emit = defineEmits(['close', 'save']);

const { open, task } = toRefs(props);
const localTask = ref({});

const schema = yup.object({
  title: yup.string().required('El título es obligatorio').min(3, 'Debe tener al menos 3 caracteres'),
  description: yup.string(),
  assignee: yup.string().required('Debe asignar la tarea a alguien'),
  priority: yup.string().required('La prioridad es obligatoria'),
});

watch(open, (isOpen) => {
  if (isOpen) {
    localTask.value = task.value ? { ...task.value } : { title: '', description: '', tags: [], priority: '', assignee: '', column: 'todo' };
  }
});

function handleSubmit() {
  emit('save', localTask.value);
}

</script>

<template>
  <div v-if="open" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-box">
      <h2 id="task-modal-title">{{ task ? 'Editar Tarea' : 'Crear Tarea' }}</h2>
      <Form @submit="handleSubmit" :validation-schema="schema" :initial-values="localTask" v-slot="{ meta }">
        <div class="form-group">
          <label for="title">Título</label>
          <Field name="title" id="title" type="text" v-model="localTask.title" class="form-input" />
          <ErrorMessage name="title" class="error-text" />
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <Field name="description" id="description" as="textarea" v-model="localTask.description" class="form-input" rows="4" />
          <ErrorMessage name="description" class="error-text" />
        </div>

        <div class="form-group">
          <label for="assignee">Asignado a</label>
          <Field name="assignee" id="assignee" as="select" v-model="localTask.assignee" class="form-input">
            <option value="" disabled>Selecciona un usuario</option>
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
          </Field>
          <ErrorMessage name="assignee" class="error-text" />
        </div>

        <div class="form-group">
          <label for="priority">Prioridad</label>
          <Field name="priority" id="priority" as="select" v-model="localTask.priority" class="form-input">
            <option value="" disabled>Selecciona una prioridad</option>
            <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
          </Field>
          <ErrorMessage name="priority" class="error-text" />
        </div>
        
        <div class="modal-actions">
          <button type="button" @click="emit('close')" class="btn-secondary">Cancelar</button>
          <button type="submit" :disabled="!meta.valid" class="btn-primary">Guardar</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.error-text {
  color: #d32f2f;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary {
  background-color: #42b883;
  color: white;
  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
}

.btn-secondary {
  background-color: #f0f0f0;
}
</style>
