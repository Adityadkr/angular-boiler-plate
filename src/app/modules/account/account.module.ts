import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ReusableComponentsModule } from 'src/app/lib/components/reusable-components/reusable-components.module';
import { RegistrationComponent } from './registration/registration.component';
import { DirectiveCollectionModule } from 'src/app/lib/directive-collection/directive-collection.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReusableComponentsModule,
    DirectiveCollectionModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountModule { }
