import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConditionalValidatorsComponent} from "./conditional-validators/conditional-validators.component";
import {CoRequiredConditionallyComponent} from "./co-required-conditionally/co-required-conditionally.component";
import {FormTestComponent} from "./form-test/form-test.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgJoyValidatorsModule} from "ngJoyValidators";
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CustomValidatorSecondPartComponent } from './custom-validator-second-part/custom-validator-second-part.component';

@NgModule({
  declarations: [
    AppComponent,
    FormTestComponent,
    CoRequiredConditionallyComponent,
    ConditionalValidatorsComponent,
    CreditCardComponent,
    CustomValidatorSecondPartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgJoyValidatorsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
