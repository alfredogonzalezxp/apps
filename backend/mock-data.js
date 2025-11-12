import { reactive } from 'vue';

// Usamos `reactive` para que los cambios en los datos se propaguen por la aplicación.
export const db = reactive({
  tasks: [
    { id: 1, title: 'Diseñar UI/UX del Dashboard', description: 'Crear mockups en Figma.', tags: ['diseño', 'ui'], priority: 'Alta', assignee: 'Ana', dueDate: '2024-08-15', column: 'todo' },
    { id: 2, title: 'Implementar API de autenticación', description: 'Usar JWT para la autenticación.', tags: ['backend', 'api'], priority: 'Media', assignee: 'Luis', dueDate: '2024-08-20', column: 'in-progress' },
    { id: 3, title: 'Crear componente TaskCard', description: 'Componente reutilizable para las tareas.', tags: ['frontend', 'vue'], priority: 'Alta', assignee: 'Sara', dueDate: '2024-08-12', column: 'done' },
  ],
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ],
  users: [
    { id: 1, name: 'Ana', avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Ana` },
    { id: 2, name: 'Luis', avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Luis` },
    { id: 3, name: 'Sara', avatar: `https://api.dicebear.com/8.x/initials/svg?seed=Sara` },
  ],
  tags: ['diseño', 'ui', 'backend', 'api', 'frontend', 'vue'],
  priorities: ['Baja', 'Media', 'Alta'],
});