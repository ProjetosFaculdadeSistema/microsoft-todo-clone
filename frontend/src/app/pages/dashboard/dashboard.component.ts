import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  exibirFormulario = false;
  tasks: Task[] = [];
  filtro: 'todas' | 'pendentes' | 'concluidas' = 'todas';

  novaTarefa: Partial<Task> = {
    title: '',
    description: ''
  };

  nomeUsuario: string = '';
  mostrarBoasVindas = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarTarefas();
    this.exibirMensagemBoasVindas();
  }

  get headers() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  exibirMensagemBoasVindas() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.nomeUsuario = payload.name || 'usuário';
      this.mostrarBoasVindas = true;

      setTimeout(() => {
        this.mostrarBoasVindas = false;
      }, 3500);
    } catch (e) {
      this.nomeUsuario = '';
    }
  }

  carregarTarefas() {
    this.http.get<Task[]>('http://localhost:5000/api/tasks', this.headers)
      .subscribe({
        next: (res) => this.tasks = res.reverse(),
        error: (err) => console.error('Erro ao carregar tarefas', err)
      });
  }

  mostrarFormulario() {
    this.exibirFormulario = true;
  }

  cancelarFormulario() {
    this.exibirFormulario = false;
    this.novaTarefa = { title: '', description: '' };
  }

  adicionarTarefa() {
    const tituloLimpo = this.novaTarefa.title?.trim();
    if (!tituloLimpo) {
      alert('O título da tarefa não pode estar vazio.');
      return;
    }

    const nova: Partial<Task> = {
      title: tituloLimpo,
      description: this.novaTarefa.description?.trim() || '',
      completed: false
    };

    this.http.post<Task>('http://localhost:5000/api/tasks', nova, this.headers)
      .subscribe({
        next: (task) => {
          this.tasks.unshift(task); // Adiciona no topo
          this.cancelarFormulario();
        },
        error: (err) => console.error('Erro ao adicionar tarefa', err)
      });
  }

  alternarStatus(task: Task) {
    const atualizado = { ...task, completed: !task.completed };

    this.http.put(`http://localhost:5000/api/tasks/${task._id}`, atualizado, this.headers)
      .subscribe({
        next: () => {
          task.completed = !task.completed;
        },
        error: (err) => console.error('Erro ao atualizar tarefa', err)
      });
  }

  excluirTarefa(id?: string) {
    if (!id) return;

    const confirmar = confirm('Tem certeza que deseja excluir esta tarefa?');
    if (!confirmar) return;

    this.http.delete(`http://localhost:5000/api/tasks/${id}`, this.headers)
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t._id !== id);
        },
        error: (err) => console.error('Erro ao excluir tarefa', err)
      });
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
