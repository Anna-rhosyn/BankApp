import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { //3rd execute
   
  //properties
  // aim= "Your perfect banking partner";

  // accounts="Enter ur acno here";

  acno="";//1000
  pswd="";//1000
  // user defined functions // 4th execute

  acnoChange(event:any){
    this.acno=event.target.value;//1000
    console.log(this.acno);
    
  }

 pswdChange(event:any){
  this.pswd=event.target.value;
    console.log(this.pswd);
    
  }

 

  // login(a:any,p:any){
  //   //alert('login clicked');
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno]['password']){
  //      alert("login successfull");
  //     }
  //     else{
  //       alert("Invalid password");
  //     }
  //   }
  //   else{
  //     alert("Invalid user details");
  //   }
  // }

  // userDetails : any={ // object of objects
  //   1000:{acno:1000, username:'Anna' ,password:1000,balance:1000},
  //   1001:{acno:1001, username:'Dani' ,password:1001,balance:1000},
  //   1002:{acno:1002, username:'Amy' ,password:1002,balance:1000}
  // }

  //router - variable of login
  //Router - its a class of navigateByUrl
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }  //1st execute
  //spl member function, automatically invokes when an obj  created




  login(){
    // console.log(this.loginForm);

    //alert('login clicked');
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    
    if(this.loginForm.valid){
      const result=this.ds.login(acno,pswd)
      .subscribe((result:any)=>
      {
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))
        
        alert(result.message);//login successfully
        this.router.navigateByUrl('dashboard')
      },
      result=>{
        alert(result.error.message);//user already registered
        this.router.navigateByUrl('')
      }
      )

   
  }
 

  }



  
  //loginmodel
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-aA-Z0-9]*')]]
    })

  ngOnInit(): void { //2nd execute -  life cycle hooks of angular  - 
    // initial process of component  initialization
  }

}
