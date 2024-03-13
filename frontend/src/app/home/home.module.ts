import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    TableComponent,
    UserProfileComponent,
  ],
  imports: [RouterModule, CommonModule],
})
export class HomeModule {}
