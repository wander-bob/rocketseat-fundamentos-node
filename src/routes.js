import { Database } from './db/database.js';
const database = new Database;

export const routes = [
  {
    method: 'GET',
    path: '/notes',
    handler: (req, res)=>{
      return res.writeHead(200).end('ok')
    }
  },
  {
    method: 'POST',
    path: '/notes',
    handler: (req, res)=>{
      console.log(req.body)
      
      return res.writeHead(200).end('ok')
    }
  }
]