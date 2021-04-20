import { Component, OnInit } from '@angular/core';
import { TodoService } from './share/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray : any[];
  toDoListDone: any[];
  beforeEditing: string;
  ordenar: boolean;
  arriba: boolean;

  constructor(private toDoService: TodoService) { }

  ngOnInit(): void {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
      //this.toDoListArray.sort((a,b) => {
        //return a.state - b.state;
      //})
    });
  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string,state) {
    this.toDoService.checkOrUnCheckTitle($key,state+1);
  }

  alterCheck2($key: string,state) {
    this.toDoService.checkOrUnCheckTitle($key,state-1);
  }

  onDelete($key : string){
    this.toDoService.removeTitle($key);
  }

  titleOrder(arriba: boolean = true){
    this.toDoListArray = this.toDoListArray.sort( (a, b) => {
      if(a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
        if (arriba) {
          return -1;
        } else {
          return 1
        }
      }
      else if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()){
        if (arriba) {
          return 1;
        } else {
          return -1
        }
      }
      else return 0
    });
    this.ordenar = true;
    this.arriba = arriba;
  }

  stateOrder(arriba: boolean = true){
    if (arriba) {
      this.toDoListArray = this.toDoListArray.sort( (a, b) => (b.state - a.state));
    } else {
      this.toDoListArray = this.toDoListArray.sort( (a, b) => (a.state - b.state));
    }
    this.ordenar = false;
    this.arriba = arriba;
  }

  dateOrder(arriba: boolean = true) {
    if (arriba) {
      this.toDoListArray = this.toDoListArray.sort( (a, b) => (b.timestamp - a.timestamp));
    } else {
      this.toDoListArray = this.toDoListArray.sort( (a, b) => (a.timestamp - b.timestamp));
    }
    this.ordenar = false;
    this.arriba = arriba;
  }
  
  editTask($key: string, event: any){
    event.editing = !event.editing;
    this.toDoListArray[$key] = event;
  }

}
