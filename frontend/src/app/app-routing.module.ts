import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { DashboardComponent } from './home/components/dashboard/dashboard.component';
import { TableComponent } from './home/components/table/table.component';
import { UserProfileComponent } from './home/components/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { PersonalInfoComponent } from './home/components/user-profile/child-components/personal-info/personal-info.component';
import { UserServicesComponent } from './home/components/user-profile/child-components/user-services/user-services.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'table', component: TableComponent },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        children: [
          { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
          { path: 'personal-info', component: PersonalInfoComponent },
          { path: 'user-services', component: UserServicesComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
