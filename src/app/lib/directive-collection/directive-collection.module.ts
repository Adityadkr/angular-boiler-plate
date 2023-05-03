import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerDirective } from './datepicker/datepicker.directive';
import { Datepicker2Directive } from './datepicker2/datepicker2.directive';
import { NumberonlyDirective } from './numberonly/numberonly.directive';



@NgModule({
  declarations: [
    DatepickerDirective,
    Datepicker2Directive,
    NumberonlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[DatepickerDirective,Datepicker2Directive,NumberonlyDirective]
})
export class DirectiveCollectionModule { }
