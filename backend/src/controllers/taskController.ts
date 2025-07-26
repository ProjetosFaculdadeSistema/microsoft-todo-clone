import { Request, Response } from 'express';
import { Task } from '../models/Task';

interface AuthRequest extends Request {
  userId?: string;
}

// Criar nova tarefa
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      user: req.userId
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa.' });
  }
};

// Listar tarefas do usuário
export const getUserTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas.' });
  }
};

// Atualizar tarefa
export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, dueDate, completed },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
  }
};

// Deletar tarefa
export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.userId });

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });

    res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa.' });
  }
};

