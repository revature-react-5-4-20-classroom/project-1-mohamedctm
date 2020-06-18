import axios from 'axios';
import { Writer } from '../model/Writer';
import { Post } from '../model/Post';

import { FailedLoginError } from '../errors/FailedLoginError';


const libraryClient = axios.create({
  baseURL: 'http://54.174.125.219:3001/',
  withCredentials: false,
});


export async function getAllWriters() : Promise<Writer[] | any> {
  const response = await libraryClient.get('/users');
  console.log(response.data);
  return response.data;

}

export async function destroy() : Promise<any> {
  const response = await libraryClient.get('/logout');
  console.log(response.data);
}

export async function FetchingAllPosts() : Promise<Post[] | any> {
  const response = await libraryClient.get('/posts');
  return response.data;
  
}




export async function createNew(a:number,b:number,c:string, d:number) : Promise<Post[] | any> {

  const response = await libraryClient.post(`/posts`,{id:a,amount:b,description:c,type:d});
  return response.data;
}

export async function updatexx(a:any,b:any,c:any,d:any,e:any,f:any, g:number) : Promise<Writer[] | any> {

  const response = await libraryClient.patch(`/users`,{username:!!(a)?a:null,password:!!(b)?b:null,firstname:!!(c)?c:null,lastname:!!(d)?d:null,email:!!(e)?e:null,phone:!!(f)?f:null, permission:g});
  return response.data;
}

export async function authorRe(id:number) : Promise<Post[] | any> {
  const response = await libraryClient.get(`posts/author/userid/${!!(id)?id:1}`);
  console.log(response.data);
  return response.data;
}

export async function patching(a:any,b:any,c:any,d:any,e:any,f:any) : Promise<Post[] | any> {
  const response = await libraryClient.patch(`posts/`,{reimbursementid:!!(a)?a:null,resolver:!!(b)?b:null,amount:!!(c)?c:null,description:!!(d)?d:null,status:!!(e)?e:null,type:!!(f)?f:null});
  console.log(response.data);
  return response.data;
}

export async function sta(id:number) : Promise<Post[] | any> {
  const response = await libraryClient.get(`posts/status/${id}`);
  console.log(response.data);
}

export async function getSingle(id:number) : Promise<Writer[] | any> {
  const response = await libraryClient.get(`/users/${id}`);
  console.log(response.data);
  return response.data;
}

export async function login(un: string, pw: string): Promise<any> {
  try {
    const response = await libraryClient.post('/login', {username: un, password: pw});
    return response.data;
  } catch (e) {
    if(e.response.status === 401 ||e.response.status === 400 ||e.response.status === 403)  {
      throw new FailedLoginError('Failed to authenticate', un);
    } else {
      throw new FailedLoginError('Failed to authenticate', un);
    }
  }
  
}
