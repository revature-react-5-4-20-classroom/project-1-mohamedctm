import axios from 'axios';

export async function getPlanet(id: number) : Promise<any> {
  //Using axios in an async function is easy, just use axios.get for a get, axios.post for a post, ..
  return (await axios.get(`http://100.25.132.252:3000/`)).data;
}