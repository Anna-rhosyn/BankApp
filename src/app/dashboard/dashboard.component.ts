import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//login display
user="";

  //deposit properties
  acno="";
  pswd="";
  amount="";

  //withdraw properties
  acno1="";
  pswd1="";
  amount1="";

  //date and time properties
  systemDate:any;


//control
  constructor(private ds:DataService,private fb:FormBuilder , private router:Router ) { 
    if(localStorage.getItem('currentAcno'))   {
      this.user=JSON.parse(localStorage.getItem('currentUser')||'')
    }
    
       this.systemDate=new Date();
  }

  
  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-aA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
   })
   

   withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-aA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
    })

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login');
      this.router.navigateByUrl('');
    }
  }
  deposit(){
    // console.log(this.depositForm);

    var acno=this.depositForm.value.acno;
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;

    this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message);
    },
    result=>{
      alert(result.error.message);
    }
    )
   
    
  }
 withdraw(){
  console.log(this.withdrawForm);

  var acno=this.withdrawForm.value.acno1;
  var pswd=this.withdrawForm.value.pswd1;
  var amount=this.withdrawForm.value.amount1;

  this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message);
    },
    result=>{
      alert(result.error.message);
    }
    )

 }

 logout()
 {
  //remove login name
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAcno');
  localStorage.removeItem('token');

  //naviagate to login page
  this.router.navigateByUrl('');
}
delete(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
}

onCancel(){
  this.acno=""
}
onDelete(event:any){
  //  alert(event)
  this.ds.deleteAcc(event)
  .subscribe((result:any)=>{
    alert(result.message);
    this.router.navigateByUrl('')
 },
 result=>{
  alert(result.error.message);
 }
  )
}

}
