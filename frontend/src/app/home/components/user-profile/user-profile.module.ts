import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './child-components/personal-info/personal-info.component';
import { UserServicesComponent } from './child-components/user-services/user-services.component';

@NgModule({
  declarations: [PersonalInfoComponent, UserServicesComponent],
  imports: [CommonModule],
})
export class UserProfileModule {}
