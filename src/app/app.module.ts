import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexModule, GridModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { NumericPipe } from './pipes/numeric.pipe';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { ForgeComponent } from './forge/forge.component';
import {MatBadgeModule} from '@angular/material/badge';
import { GoldenQuarksComponent } from './golden-quarks/golden-quarks.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NumericPipe,
    ForgeComponent,
    GoldenQuarksComponent,
    ProgressChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FlexModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    ClipboardModule,
    GridModule,
    MatSnackBarModule,
    MatTabsModule,
    MatBadgeModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
