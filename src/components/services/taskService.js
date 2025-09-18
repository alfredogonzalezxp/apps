const API_BASE_URL = 'http://localhost:3001/api';

export const taskService = {
  async getData() {
    const response = await fetch(`${API_BASE_URL}/board`);
    if (!response.ok) throw new Error('Failed to fetch board data');
    return response.json();
  },

  async createTask(task) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  async updateTask(task) {
    const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  async updateTaskColumn(taskId, newColumnId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/column`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newColumnId }),
    });
    if (!response.ok) throw new Error('Failed to move task');
    return response.json();
  },
};