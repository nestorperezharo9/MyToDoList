import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class TodoService {
  toDoList: AngularFireList<any>;
  
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;   //se devuelve la lista que tenga la base de datos actual
  }

  addTitle(title: string) {
    const current = new Date();
    const timestamp = current.getTime();
    this.toDoList.push({
      title: title,
      state: 0,    //siempre que se añada va a ser 0
      timestamp,
    });
  }

  editItem(itemKey,item){
    const itemUpdate = this.firebasedb.list('titles');
    itemUpdate.update(itemKey,{title:item.title});
  }

  checkOrUnCheckTitle($key: string, int: number) {
    this.toDoList.update($key, { state: int });
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}