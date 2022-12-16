import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //login name display
  currentUser:any;

  //login acno
  currentAcno:any;


  userDetails : any={ // object of objects
    1000:{acno:1000, username:'Anna' ,password:1000,balance:1000,transaction:[]},
    1001:{acno:1001, username:'Dani' ,password:1001,balance:1000,transaction:[]},
    1002:{acno:1002, username:'Amy' ,password:1002,balance:1000,transaction:[]}
  }
  constructor( private router:Router, private http:HttpClient) {
    // this.getDetails();
   }
  
  //saveDetails()- To store the details into localstorage

  saveDetails(){//function definition
    if(this.userDetails){
      localStorage.setItem('dataBase',JSON.stringify(this.userDetails));
    }
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    }
  }

  //getDetails() - To get details from localstorage

  // getDetails(){
  //   if(localStorage.getItem('database')){
  //     this.userDetails=JSON.parse(localStorage.getItem('database')||'');
  //   }
  //   if(localStorage.getItem('currentAcno')){
  //     this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'');
  //   }
  //   if(localStorage.getItem('currentUser')){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'');
  //   }
  // }



  register(acno:any,username:any,password:any){
    const data={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register',data)
      // var userDetails=this.userDetails;
      // if(acno in localStorage){
      //   return false;
      // }
      // else{
      //   userDetails[acno]={
      //     acno,
      //     username,
      //     password,
      //     balance:0,
      //     transaction:[]
      //   }
      //   console.log(userDetails);
      //   this.saveDetails();//functioncall
      //   return true;
        
      // }
  }
  login(acno:any,password:any){
    const data={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',data)
    // var userDetails=this.userDetails;
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     this.currentUser=userDetails[acno]['username']
    //     this.currentAcno=acno;
    //     this.saveDetails();//functioncall
    //      return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    // else{
    //   return false;
    // }
  }

  getToken(){
    const token=JSON.parse(localStorage.getItem('token')||'');//get token from localstorage
    //generate header
    let headers=new HttpHeaders()
    //token append
    if(token){
      options.headers=headers.append('x-access-token',token)
    }
    return options
  }

  deposit(acno:any,pswd:any,amt:any)
  {
    const data={
      acno,
      password:pswd,
      amount:amt
    }
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  }
  withdraw(acno:any,pswd:any,amt:any)
  {
    const data={
      acno,
      password:pswd,
      amount:amt
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())

  }
  getTransaction(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())
  }

  deleteAcc(acno:any){
   return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }

  
}
