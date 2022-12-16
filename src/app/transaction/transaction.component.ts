import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //to hold the current user acno
  acno:any;
  transaction:any;

  constructor(private ds:DataService) {
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')//from localstorage
    this.transaction=this.ds.getTransaction(this.acno)
   .subscribe((result:any)=>{
    this.transaction=result.transaction;
   },
   result=>{
    alert(result.err.message)
   }
   )
    
   }

  ngOnInit(): void {
  }

}
