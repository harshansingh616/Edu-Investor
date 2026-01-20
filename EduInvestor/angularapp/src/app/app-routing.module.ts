import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
 import { LoginComponent } from './components/login/login.component';
 import { RegistrationComponent } from './components/registration/registration.component';
 import { CreateloanComponent } from './components/createloan/createloan.component';
  import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
 import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
 import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
 import { LoanformComponent } from './components/loanform/loanform.component';
 import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
 import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
 import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
 import { ViewloanComponent } from './components/viewloan/viewloan.component';
 import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
 import { ErrorComponent } from './components/error/error.component';
 import { AuthGuard } from './components/authguard/auth.guard';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin/home', component:HomeComponent,canActivate:[AuthGuard] },
  { path: 'admin/home', component:HomeComponent,canActivate:[AuthGuard] },
  { path: 'user/home', component:HomeComponent,canActivate:[AuthGuard]  },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'admin/addloan', component: CreateloanComponent,canActivate:[AuthGuard]  },
  { path: 'admin/viewloan', component: ViewloanComponent,canActivate:[AuthGuard]  },
  { path: 'requestedloan', component: RequestedloanComponent,canActivate:[AuthGuard]  },
  { path: 'adminviewfeedback', component: AdminviewfeedbackComponent,canActivate:[AuthGuard]  },
  { path: 'adminnav', component: AdminnavComponent },
  { path: 'usernav', component: UsernavComponent },
  { path: 'user/useraddfeedback', component: UseraddfeedbackComponent,canActivate:[AuthGuard]  },
  { path: 'user/userappliedloan', component: UserappliedloanComponent,canActivate:[AuthGuard]  },
  { path: 'user/userviewfeedback', component: UserviewfeedbackComponent,canActivate:[AuthGuard]  },
  { path: 'user/useraddfeedback', component: UseraddfeedbackComponent,canActivate:[AuthGuard]  },
  { path: 'user/userviewloan', component: UserviewloanComponent, canActivate:[AuthGuard]},
  { path: 'admineditloan/:loanId', component: AdmineditloanComponent,canActivate:[AuthGuard]  },
  { path: 'loanform/:loanId', component: LoanformComponent,canActivate:[AuthGuard] },
  {path: 'error', component: ErrorComponent},
  {path: '**',redirectTo: '/error', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 export class AppRoutingModule { }
