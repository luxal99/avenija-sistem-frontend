import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { MaterialModule } from './material.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { EstateOverviewComponent } from './admin/estate-overview/estate-overview.component';
import { AddEstateDialogComponent } from './admin/estate-overview/add-estate-dialog/add-estate-dialog.component';
import { OptionComponent } from './admin/option/option.component';
import { AddCityDialogComponent } from './admin/option/add-city-dialog/add-city-dialog.component';
import { AddPartOfCityDialogComponent } from './admin/option/add-part-of-city-dialog/add-part-of-city-dialog.component';
import { AddEstateCategoryDialogComponent } from './admin/option/add-estate-category-dialog/add-estate-category-dialog.component';
import { AddEstateSubCategoryDialogComponent } from './admin/option/add-estate-sub-category-dialog/add-estate-sub-category-dialog.component';
import { AddEstateTypeDialogComponent } from './admin/option/add-estate-type-dialog/add-estate-type-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ClientComponent,
    EstateOverviewComponent,
    AddEstateDialogComponent,
    OptionComponent,
    AddCityDialogComponent,
    AddPartOfCityDialogComponent,
    AddEstateCategoryDialogComponent,
    AddEstateSubCategoryDialogComponent,
    AddEstateTypeDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule,
    {provide:LocationStrategy,useClass:HashLocationStrategy}
  ],
  entryComponents:[AddCityDialogComponent,AddEstateTypeDialogComponent,AddEstateCategoryDialogComponent,AddEstateSubCategoryDialogComponent,AddPartOfCityDialogComponent,AddEstateDialogComponent,OptionComponent,EstateOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
