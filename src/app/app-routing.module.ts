import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './homepage/profile/profile.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisterProfileProcessComponent } from './auth-page/register-profile-process/register-profile-process.component';
import { AuthGuardService as AuthGuard} from './shared/services/auth-guard.service';
import { MyDebtComponent } from './homepage/my-debt/my-debt.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { EventDetailComponent } from './homepage/event-detail/event-detail.component';
import { RoleGuardService as RoleGuard} from './shared/services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'my-debt',
        component: MyDebtComponent,
      },
      {
        path: 'event-detail',
        component: EventDetailComponent,
      },
      {
        path: 'admin-panel',
        loadChildren: () => import('./homepage/admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
      }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
  {
    path: 'create-profile',
    component: RegisterProfileProcessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
