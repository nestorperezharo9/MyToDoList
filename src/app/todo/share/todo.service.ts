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
      isChecked: false    //siempre que se añada va a ser false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

  addTitleDone( title: string) {
    this.listDone.push({
      title: title,
      isChecked: true    //siempre que se añada va a ser false
    });
  }

}