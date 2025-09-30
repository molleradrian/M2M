import { Injectable, signal } from '@angular/core';
import { VendorTask } from '../models/vendor-task.model';

@Injectable({
  providedIn: 'root'
})
export class VendorTaskService {
  private readonly STORAGE_KEY = 'm2m_vendor_tasks';
  
  tasks = signal<VendorTask[]>(this.loadTasks());

  constructor() {}

  private loadTasks(): VendorTask[] {
    if (typeof localStorage === 'undefined') return [];
    
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);
    if (!tasksJson) return [];

    return JSON.parse(tasksJson, (key, value) => {
      if (key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });
  }

  private saveTasks() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
    }
  }

  addTask(taskData: Omit<VendorTask, 'id' | 'completed' | 'createdAt'>) {
    const newTask: VendorTask = {
      ...taskData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  toggleTaskCompletion(taskId: string) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    this.saveTasks();
  }

  deleteTask(taskId: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
    this.saveTasks();
  }
}
