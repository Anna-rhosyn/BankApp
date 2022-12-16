import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  uname="";
  acno="";
  pswd="";
  
//formBuilder -class its contains group,array and control - ReactiveFormsModule
constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }
  //ds register variable
  
  //register model
  registerForm=this.fb.group({//group  //* - regular expression
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-aA-Z0-9]*')]]
  })

  //control - goes to register.component.html
  ngOnInit(): void {
  }


  register(){
    // alert('Register clicked')
    console.log(this.registerForm);
    

   var  uname=this.registerForm.value.uname;
   var acno=this.registerForm.value.acno;
   var pswd=this.registerForm.value.pswd;

   
   if(this.registerForm.valid){
    const result=this.ds.register(acno,uname,pswd)
    .subscribe((result:any)=>
    {
      alert(result.message);//register successfully
      this.router.navigateByUrl('')
      
    },
    result=>{
      alert(result.error.message);//user already registered
      this.router.navigateByUrl('register')
    }
    )

    
    }
    else{
      alert('Register failed');
      console.log(this.registerForm.get('uname')?.errors);
      
    }

  }

}
