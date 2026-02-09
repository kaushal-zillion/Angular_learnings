import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  tasks = signal<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  addTask(title: string) {
    const newTask: Task = { id: Date.now(), title, isCompleted: false };
    this.tasks.update(allTasks => [...allTasks, newTask]);
    this.save();
  }

  toggleTask(id: number) {
    this.tasks.update(allTasks =>
      allTasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)
    );
    this.save();
  }

  deleteTask(id: number) {
    this.tasks.update(allTasks => allTasks.filter(t => t.id !== id));
    this.save();
  }

}