import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import assert from 'node:assert';
import * as csv from 'csv';



export class Database{
  #dataPath = new URL('./db.csv', import.meta.url);
  #database = `id,title,description,completed_at,created_at,updated_at`;
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
      completed_at: new Date().toLocaleString().replace(',',''),
      created_at: new Date().toLocaleString().replace(',',''),
      updated_at: new Date().toLocaleString().replace(',','')
    }
    this.#database = `${this.#database}\n${Object.values(note)}`;
    this.#persist()
  }
  select(){
    const [tableHead, ...tableBody] = this.#database.split('\n');
    const notes = tableBody.map(row=>{
      return row.split(',').map((cel, index)=>{
        return {[tableHead.split(',')[index]]: cel}
      })
    })
    const result = notes.map(note => Object.assign({}, ...note))
    return result;
  }
}
