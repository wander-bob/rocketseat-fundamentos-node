import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';


export class Database{
  #dataPath = new URL('./db.json', import.meta.url);
  #database = {};
  constructor(){
    fs.readFile(this.#dataPath, 'utf-8')
      .then(data =>{
        this.#database = JSON.parse(data);
      }).catch(()=>{
        this.#persist();
      })
  }
  #persist (){
    fs.writeFile(this.#dataPath, JSON.stringify(this.#database))
  }
  select(table, search){
    let data =  this.#database[table]??[];
    if(search){
      return data = data.filter(row =>{
        return Object.entries(search).some(([key, value])=>{
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }
    return data;
  }
  insert( table , data){
    const creationDate = new Date().toLocaleString().replace(',','');
    const task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      completed_at: null,
      created_at: creationDate,
      updated_at: creationDate
    }
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(task);
    }else{
      this.#database[table] = [task];
    }
    this.#persist()
  }
  update(table, id, data){
    const updateDate = new Date().toLocaleString().replace(',','');
    const {title, description, completed } = data;
    const tasks = this.select(table);
    const task =  tasks.find(row => row.id === id)
    if(!task){
      return { message: "not found", code: 404 }
    }
    const rowIndex = tasks.findIndex(row=> row.id === id);
    const updatedTask = {
      id,
      title: title ?? task.title,
      description: description ?? task.description,
      completed_at: null,
      created_at: task.created_at,
      updated_at: updateDate,
    }
    if(rowIndex > -1){
      this.#database[table][rowIndex] = updatedTask
      this.#persist();
    }
    return { message: "done", code: 204 }
  }
  delete(table, id){
    const rowIndex = this.select(table).findIndex(row=> row.id === id);
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist();
    }else{
      return { message: "not found", code: 404 }
    }
    return { code: 204 }
  }
  complete(table, id){
    const updateDate = new Date().toLocaleString().replace(',','');
    const tasks = this.select(table);
    const task =  tasks.find(row => row.id === id);
    if(!task){
      return { message: "not found", code: 404 }
    };
    const rowIndex = tasks.findIndex(row=> row.id === id);
    task.completed_at = updateDate;
    task.updated_at = updateDate;
    if(rowIndex > -1){
      this.#database[table][rowIndex] = task;
    }
    return { code: 204 }
  }
}
