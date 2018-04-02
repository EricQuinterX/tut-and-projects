import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  title: string;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  ngOnInit() {
  }

  addTask(event) {
    event.preventDefault(); // no refresca la pagina
    const newTask: Task = {
      title: this.title,
      isDone: false
    };
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(id: string) {
    if (confirm('Esta seguro?')) {
      this.taskService.deleteTask(id)
      .subscribe(data => {
        if (data.n === 1) {
          this.tasks = this.tasks.filter(t => t._id !== id)
        }
      });
    }
    return;
  }

  updateTask(task: Task) {
    if (confirm('Quiere Actualizar la Tarea?')) {
      const newTask: Task = Object.assign({}, task, {isDone: !task.isDone});
      this.taskService.updateTask(newTask)
        .subscribe(res => {
          task.isDone = !task.isDone
        });
        //this.tasks = this.tasks.filter
    }
  }
}
