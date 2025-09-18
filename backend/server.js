import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer JSON en el body de las peticiones

// --- Base de Datos en Memoria (simulada) ---
let db = {
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
};

// --- API Endpoints ---

// [POST] /api/login - Simula el inicio de sesión
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  // Simulación: creamos el usuario si el nombre es válido
  const user = {
    name: username,
    avatar: `https://api.dicebear.com/8.x/initials/svg?seed=${username}`
  };
  res.json({ user });
});

// [GET] /api/board - Devuelve todos los datos del tablero
app.get('/api/board', (req, res) => {
  res.json(db);
});

// [POST] /api/tasks - Crea una nueva tarea
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  
  // Asignar un nuevo ID (simple, para esta simulación)
  const newId = db.tasks.length > 0 ? Math.max(...db.tasks.map(t => t.id)) + 1 : 1;
  newTask.id = newId;
  
  // Asegurarse de que tiene una columna por defecto si no se especifica
  if (!newTask.column) newTask.column = 'todo';
  
  db.tasks.push(newTask);
  res.status(201).json(newTask);
});

// [PUT] /api/tasks/:id - Actualiza una tarea
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const updatedTaskData = req.body;
  const taskIndex = db.tasks.findIndex(t => t.id === taskId);

  if (taskIndex > -1) {
    db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...updatedTaskData };
    res.json(db.tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// [PUT] /api/tasks/:id/column - Mueve una tarea a otra columna
app.put('/api/tasks/:id/column', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { newColumnId } = req.body;
    const task = db.tasks.find(t => t.id === taskId);

    if (task) {
        task.column = newColumnId;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});