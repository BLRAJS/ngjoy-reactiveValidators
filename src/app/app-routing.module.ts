import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormTestComponent} from "./form-test/form-test.component";
import {CoRequiredConditionallyComponent} from "./co-required-conditionally/co-required-conditionally.component";
import {ConditionalValidatorsComponent} from "./conditional-validators/conditional-validators.component";
import {CreditCardComponent} from "./credit-card/credit-card.component";
import {CustomValidatorSecondPartComponent} from "./custom-validator-second-part/custom-validator-second-part.component";

const routes: Routes = [
  {path: "ngJoyValidators", component: FormTestComponent},
  {path: "custom-validator-2", component: CustomValidatorSecondPartComponent},
  {path: "credit-card-and-iban", component: CreditCardComponent},
  {path: "co-required", component: CoRequiredConditionallyComponent},
  {path: "co-validators", component: ConditionalValidatorsComponent},
  {path: '', redirectTo: '/ngJoyValidators', pathMatch: 'full'}, // redirects to `ngJoyValidators` as the default route
  {path: '**', redirectTo: '/ngJoyValidators', pathMatch: 'full'}, // redirects to `ngJoyValidators` if the route is not matched in the above routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
