import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  newTaskTitle = '';

  taskService = inject(TaskService);

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }
}
