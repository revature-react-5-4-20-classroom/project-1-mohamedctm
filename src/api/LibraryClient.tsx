import axios from 'axios';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';

import { FailedLoginError } from '../errors/FailedLoginError';


const libraryClient = axios.create({
  baseURL: 'http://100.25.132.252:3000',
  withCredentials: true,
});

//@adam : Library-express is running on my EC2 with public IP 18.232.125.207


export async function getAllUsers() : Promise<User[] | any> {
  const response = await libraryClient.get('/users');
  // return response.data;
  console.log(response.data);
  return response.data;
  // return response.data.map((userObj: any) => {
  //   const {id, username, password, firstname, lastname, email, role} = userObj;
  //   return new User(id, username, password, firstname, lastname,email, role);
  // });
}

export async function destroy() : Promise<any> {
  const response = await libraryClient.get('/logout');
  // return response.data;
  console.log(response.data);
}

export async function Allreimbursements() : Promise<Reimbursement[] | any> {
  const response = await libraryClient.get('/reimbursements');
  // return response.data;
  console.log(response.data);
  return response.data.map((userObj: any) => {
    const {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = userObj;
    return new Reimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved,description, resolver,status, type);
  });
}




export async function createNew(a:number,b:number,c:string, d:number) : Promise<Reimbursement[] | any> {

  const response = await libraryClient.post(`/reimbursements`,{id:a,amount:b,description:c,type:d});
  return response.data;
}

export async function updatexx(a:any,b:any,c:any,d:any,e:any,f:any, g:number) : Promise<User[] | any> {

  const response = await libraryClient.patch(`/users`,{username:!!(a)?a:null,password:!!(b)?b:null,firstname:!!(c)?c:null,lastname:!!(d)?d:null,email:!!(e)?e:null,roleId:!!(f)?f:null, userId:g});
  return response.data;
}

export async function authorRe(id:number) : Promise<Reimbursement[] | any> {
  const response = await libraryClient.get(`reimbursements/author/userid/${!!(id)?id:1}`);
  console.log(response.data);
  return response.data;
  // return response.data.map((userObj: any) => {
  //   const {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = userObj;
  //   return new Reimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved,description, resolver,status, type);
  // });
}

export async function patching(a:any,b:any,c:any,d:any,e:any,f:any) : Promise<Reimbursement[] | any> {
  const response = await libraryClient.patch(`reimbursements/`,{reimbursementid:!!(a)?a:null,resolver:!!(b)?b:null,amount:!!(c)?c:null,description:!!(d)?d:null,status:!!(e)?e:null,type:!!(f)?f:null});
  console.log(response.data);
  return response.data;
  // return response.data.map((userObj: any) => {
  //   const {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = userObj;
  //   return new Reimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved,description, resolver,status, type);
  // });
}

export async function sta(id:number) : Promise<Reimbursement[] | any> {
  const response = await libraryClient.get(`reimbursements/status/${id}`);
  console.log(response.data);
  return response.data.map((userObj: any) => {
    const {reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type} = userObj;
    return new Reimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved,description, resolver,status, type);
  });
}

export async function getSingle(id:number) : Promise<User[] | any> {
  const response = await libraryClient.get(`/users/${id}`);
  console.log(response.data);
  return response.data;
}

export async function login(un: string, pw: string): Promise<User> {
  try {
    const response = await libraryClient.post('/login', {username: un, password: pw});
    const {id, username, password,firstname,lastname, email, role} = response.data;
    return new User(id, username, password, firstname,lastname, email, role);
  } catch (e) {
    if(e.response.status === 401 ||e.response.status === 400) {
      throw new FailedLoginError('Failed to authenticate', un);
    } else {
      // We could throw a different custom error, this exposes a little too much to the user.
      throw e;
    }
  }
  
}
