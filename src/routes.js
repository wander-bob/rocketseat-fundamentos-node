import { Database } from './db/database.js';
import { buildRouteParams } from './utils/buld-route-params.js';
const database = new Database;

export const routes = [
  {
    method: 'GET',
    path: buildRouteParams('/tasks'),
    handler: (req, res)=>{
      const notes = database.select('tasks')
      return res.end(JSON.stringify(notes))
    }
  },
  {
    method: 'POST',
    path: buildRouteParams('/tasks'),
    handler: (req, res)=>{
      const data = req.body;
      database.insert('tasks',data)
      return res.writeHead(200).end('ok')
    }
  },
  {
    method: 'PUT',
    path: buildRouteParams('/tasks/:id'),
    handler: (req, res)=>{
      const data = req.body;
      const { id } = req.params;
      database.update('tasks',id, data)
      return res.writeHead(200).end('ok')
    }
  },
  {
    method: 'DELETE',
    path: buildRouteParams('/tasks/:id'),
    handler: (req, res)=>{
      
      return res.writeHead(200).end('ok')
    }
  },
  {
    method: 'PATCH',
    path: buildRouteParams('/tasks/:id/complete'),
    handler: (req, res)=>{
      
      return res.writeHead(200).end('ok')
    }
  }
]