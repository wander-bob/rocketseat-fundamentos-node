import http from 'node:http';
import { routes } from './routes.js';
import { jsonConverter } from './middlewares/json-converter.js';
const app = http.createServer(async (req, res)=>{
  const {method, url} = req;
  const route = routes.find(route=>{
    return route.method === method && route.path === url;
  })
  if(route){
    await jsonConverter(req, res)
    return route.handler(req, res)
  }
  return res.writeHead(404).end('Not found');
});



app.listen(3333).on("listening", ()=> console.log(`Server is running`));