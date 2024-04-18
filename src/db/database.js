import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import assert from 'node:assert';
import * as csv from 'csv';



export class Database{
  #dataPath = new URL('./db.csv', import.meta.url);
  #database = `id, title, description, completed_at, created_at\n`;
  constructor(){
    fs.readFile(this.#dataPath, 'utf-8')
      .then(data =>{
        this.#database = data;
      }).catch(()=>{
        this.#persist();
      })
  }
  #persist (){
    fs.writeFile(this.#dataPath, this.#database)
  }
  insert(data){
    const note = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      completed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    console.log(data)
    //this.#persist()
  }
}
