import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { ProfileComponent } from './homepage/profile/profile.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RegisterProfileProcessComponent } from './auth-page/register-profile-process/register-profile-process.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyDebtComponent } from './homepage/my-debt/my-debt.component';
import { AuthInterceptorInterceptor } from './shared/interceptor/auth-interceptor.interceptor';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { EventDetailComponent } from './homepage/event-detail/event-detail.component';
import { AddEventDialogComponent } from './homepage/dashboard/add-event-dialog/add-event-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomepageComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterProfileProcessComponent,
    MyDebtComponent,
    SpinnerComponent,
    EventDetailComponent,
    AddEventDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
