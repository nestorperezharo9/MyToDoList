import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  listDone: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;   //se devuelve la lista que tenga la base de datos actual
  }

  addTitle(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: 0,    //siempre que se añada va a ser 0
    });
  }

  checkOrUnCheckTitle($key: string, int: boolean) {
    this.toDoList.update($key, { isChecked: int });
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}