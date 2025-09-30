import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { VendorTaskService } from '../../services/vendor-task.service';
import { VendorTask } from '../../models/vendor-task.model';

@Component({
  selector: 'app-vendor-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendor-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorTasksComponent {
  vendorId = input.required<string>();
  
  private vendorTaskService = inject(VendorTaskService);
  private fb = inject(FormBuilder);

  taskForm = this.fb.group({
    description: ['', [Validators.required, Validators.maxLength(100)]],
  });

  private allTasks = this.vendorTaskService.tasks;
  
  tasks = computed(() => 
    this.allTasks()
      .filter(t => t.vendorId === this.vendorId())
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  );
  
  completedTasksCount = computed(() => this.tasks().filter(t => t.completed).length);
  
  progress = computed(() => {
    const total = this.tasks().length;
    if (total === 0) return 0;
    return (this.completedTasksCount() / total) * 100;
  });

  addTask() {
    if (this.taskForm.invalid) return;
    const description = this.taskForm.value.description!;
    
    this.vendorTaskService.addTask({
      vendorId: this.vendorId(),
      description,
    });
    
    this.taskForm.reset();
  }

  toggleCompletion(task: VendorTask) {
    this.vendorTaskService.toggleTaskCompletion(task.id);
  }

  deleteTask(task: VendorTask) {
    if (confirm(`Are you sure you want to delete this task?`)) {
      this.vendorTaskService.deleteTask(task.id);
    }
  }
}
