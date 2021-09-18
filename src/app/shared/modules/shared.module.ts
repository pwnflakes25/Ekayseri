import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragScrollModule } from 'ngx-drag-scroll';


@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTooltipModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    DragScrollModule,
  ],
  exports: [
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTooltipModule,
    MatChipsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MatPaginatorModule,
    DragScrollModule
  ]
})
export class SharedModule { }
