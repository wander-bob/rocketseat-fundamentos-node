import { Database } from './db/database.js';
const database = new Database;

export const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: (req, res)=>{
      const notes = database.select()
      return res.end(JSON.stringify(notes))
    }
  },
  {
    method: 'POST',
    path: '/notes',
    handler: (req, res)=>{
      const data = req.body;
      database.insert(data)
      return res.writeHead(200).end('ok')
    }
  }
]