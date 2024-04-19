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
    const rowIndex = tasks.findIndex(row=> row.id === id);
    const updatedTask = {
      id,
      title: title ?? task.title,
      description: description ?? task.description,
      completed_at: completed === true || completed == "true" ? updateDate : null,
      created_at: task.created_at,
      updated_at: updateDate,
    }
    if(task){
      this.#database[table][rowIndex] = updatedTask
    }
  }
  delete(table, id){
    
  }
}
