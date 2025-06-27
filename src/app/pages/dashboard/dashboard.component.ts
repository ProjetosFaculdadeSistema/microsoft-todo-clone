import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../shared/task.model';
import { TaskService } from '../../shared/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  exibirFormulario = false;
  tasks: Task[] = [];
  filtro: 'todas' | 'pendentes' | 'concluidas' = 'todas';

  novaTarefa: Partial<Task> = {
    title: '',
    description: ''
  };

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  mostrarFormulario() {
    this.exibirFormulario = true;
  }

  cancelarFormulario() {
    this.exibirFormulario = false;
    this.novaTarefa = { title: '', description: '' };
  }

  adicionarTarefa() {
    if (!this.novaTarefa.title?.trim()) return;

    const nova: Task = {
      id: Date.now(),
      title: this.novaTarefa.title.trim(),
      description: this.novaTarefa.description?.trim() || '',
      completed: false
    };

    this.taskService.addTask(nova);
    this.tasks = this.taskService.getTasks();
    this.cancelarFormulario();
  }

  alternarStatus(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.tasks = this.taskService.getTasks();
  }

  excluirTarefa(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  tarefasFiltradas() {
    switch (this.filtro) {
      case 'pendentes': return this.tasks.filter(t => !t.completed);
      case 'concluidas': return this.tasks.filter(t => t.completed);
      default: return this.tasks;
    }
  }

  get totalPendentes() {
    return this.tasks.filter(t => !t.completed).length;
  }

  get totalConcluidas() {
    return this.tasks.filter(t => t.completed).length;
  }
}

