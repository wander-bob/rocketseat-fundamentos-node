import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import assert from 'node:assert';
import * as csv from 'csv';

const example= {
  id: randomUUID(),
  title: 'Task 01',
  description: 'Task description',
  completed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export class Database{
  #dataPath = new URL('./db.csv', import.meta.url);
  #database = `id, title, description, completed_at, created_at`;
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
  create(){
    this.#persist()
  }
}
