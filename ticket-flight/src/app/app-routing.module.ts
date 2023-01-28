import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketCreateComponent } from './dashboard/ticket-create/ticket-create.component';
import { TicketViewComponent } from './dashboard/ticket-view/ticket-view.component';
import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './login/login.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: DefaultComponent, canActivate: [AuthGuard],
    children: [{
      path: '', component: TicketViewComponent
    },
    { path: 'ticket/create', component: TicketCreateComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard] },
    
    ]
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
