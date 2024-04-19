import { parse } from 'csv-parse'
import fs from 'node:fs';
export async function csv(){
  const dataPath = new URL('../db/data.csv', import.meta.url)
  const dataStream = fs.createReadStream(dataPath);
  const parser = dataStream  .pipe(parse({skip_empty_lines: true, from_line: 2}));
  for await (const value of parser){
    const [title, description] = value;
    await fetch('http://localhost:3333/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title, description
      })
    })
    await sleep()
  }
}
function sleep(){
  new Promise((resolve)=> setTimeout(resolve, 1000));
}
csv()