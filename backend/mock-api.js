import { db } from './mock-data';

// Simula la latencia de la red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBoard() {
  await delay(200);
  console.log("Mock API: Fetching board data");
  return { ...db };
}

export async function saveTask(task) {
  await delay(200);
  if (task.id) {
    // Actualizar tarea existente
    console.log("Mock API: Updating task", task);
    const taskIndex = db.tasks.findIndex(t => t.id === task.id);
    if (taskIndex > -1) {
      db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...task };
      return db.tasks[taskIndex];
    }
  } else {
    // Crear nueva tarea
    console.log("Mock API: Creating new task", task);
    const newId = db.tasks.length > 0 ? Math.max(...db.tasks.map(t => t.id)) + 1 : 1;
    const newTask = { ...task, id: newId, column: task.column || 'todo' };
    db.tasks.push(newTask);
    return newTask;
  }
}

export async function moveTask(taskId, newColumnId) {
    await delay(100);
    console.log(`Mock API: Moving task ${taskId} to ${newColumnId}`);
    const task = db.tasks.find(t => t.id === taskId);
    if (task) {
        task.column = newColumnId;
        return task;
    }
    throw new Error('Task not found');
}

export async function login(username) {
    await delay(200);
    if (!username) {
        throw new Error('Username is required');
    }
    console.log(`Mock API: Logging in ${username}`);

    // Buscamos el usuario en nuestra base de datos simulada
    const user = db.users.find(u => u.name.toLowerCase() === username.toLowerCase());

    if (user) {
        return { user };
    } else {
        throw new Error('User not found');
    }
}