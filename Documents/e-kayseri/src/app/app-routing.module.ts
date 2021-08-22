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

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard],
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
        path: 'spinner',
        component: SpinnerComponent,
      },
      {
        path: 'event/:id',
      }
    ]
  },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
  {
    path: 'create-profile/:id',
    component: RegisterProfileProcessComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
