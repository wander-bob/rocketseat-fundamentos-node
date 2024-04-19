export function extractQueryParams(query){
  query.substr(1)
  .split('&')
  .reduce((queryParams, param)=>{
    const [key, value] = param.split('=');
    queryParams[key] = value.replace('%20', " ");
    return queryParams
  },{})
}