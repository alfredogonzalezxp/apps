import * as api from '../../../backend/mock-api.js';

export const taskService = {
  /**
   * Obtiene todos los datos del tablero (tareas, columnas, etc.).
   */
  async getData() {
    return api.getBoard();
  },

  /**
   * Guarda una tarea (la crea si no tiene ID, o la actualiza si lo tiene).
   * @param {object} task - La tarea a guardar.
   */
  async saveTask(task) {
    return api.saveTask(task);
  },
};