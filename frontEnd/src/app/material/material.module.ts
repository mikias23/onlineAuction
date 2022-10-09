import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';
import {MatBadgeModule} from '@angular/material/badge' ;
const MaterialComponets = [
MatBadgeModule,
MatSliderModule,
MatPaginatorModule,
MatSortModule,
MatTableModule,
MatButtonToggleModule,
MatSidenavModule,
MatDatepickerModule,
MatNativeDateModule,
MatDialogModule,
MatButtonModule,
MatIconModule,
MatFormFieldModule,
MatInputModule, 
MatStepperModule,
MatRadioModule,
MatSelectModule,
MatCheckboxModule,
MatCardModule

]

@NgModule({
  exports:[MaterialComponets],
  imports: [MaterialComponets]
})
export class MaterialModule { 

}
