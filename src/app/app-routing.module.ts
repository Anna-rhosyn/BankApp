import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {//login -4200
    path:'',component: LoginComponent
  },
  {//dashboard  -4200/dashboard
    path:'dashboard',component: DashboardComponent
  },
  {//register -4200/signup
    path: 'signup',component: SignupComponent
  },
   {//register -4200/signup
    path: 'transaction',component: TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
