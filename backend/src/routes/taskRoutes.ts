import express from 'express';
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Todas as rotas abaixo estão protegidas com o middleware authenticate

router.post('/', authenticate, createTask);           // Criar tarefa
router.get('/', authenticate, getUserTasks);          // Listar tarefas
router.put('/:id', authenticate, updateTask);         // Atualizar tarefa
router.delete('/:id', authenticate, deleteTask);      // Excluir tarefa

export default router;

