import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private key = 'taskmaster_tasks';

  getTasks(): Task[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  saveTasks(tasks: Task[]) {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  addTask(task: Task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  updateTask(updated: Task) {
    const tasks = this.getTasks().map(t => t.id === updated.id ? updated : t);
    this.saveTasks(tasks);
  }

  deleteTask(id: number) {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  }
}

