import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AddAccessoriesDialogComponent } from './admin/option/add-accessories-dialog/add-accessories-dialog.component';
import { AddCityDialogComponent } from './admin/option/add-city-dialog/add-city-dialog.component';
import { AddEquipmentDialogComponent } from './admin/option/add-equipment-dialog/add-equipment-dialog.component';
import { AddEstateCategoryDialogComponent } from './admin/option/add-estate-category-dialog/add-estate-category-dialog.component';
import { AddEstateDialogComponent } from './admin/estate-overview/add-estate-dialog/add-estate-dialog.component';
import { AddEstateSubCategoryDialogComponent } from './admin/option/add-estate-sub-category-dialog/add-estate-sub-category-dialog.component';
import { AddEstateTypeDialogComponent } from './admin/option/add-estate-type-dialog/add-estate-type-dialog.component';
import { AddHeatingDialogComponent } from './admin/option/add-heating-dialog/add-heating-dialog.component';
import { AddPartOfCityDialogComponent } from './admin/option/add-part-of-city-dialog/add-part-of-city-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { AdvertisingDialogOverviewComponent } from './admin/advertising-request-overview/advertising-dialog-overview/advertising-dialog-overview.component';
import { AdvertisingRequestComponent } from './advertising-request/advertising-request.component';
import { AdvertisingRequestOverviewComponent } from './admin/advertising-request-overview/advertising-request-overview.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClientComponent } from './client/client.component';
import { EditEstateDialogComponent } from './admin/estate-overview/edit-estate-dialog/edit-estate-dialog.component';
import { EstateOverviewComponent } from './admin/estate-overview/estate-overview.component';
import { EstatePageOverviewComponent } from './estate-page-overview/estate-page-overview.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginDialogComponent } from './home/login-dialog/login-dialog.component';
import { MatIconModule } from '@angular/material';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxWatermarkModule } from 'ngx-watermark';
import { OptionComponent } from './admin/option/option.component';
import { OverviewEstateDialogComponent } from './admin/estate-overview/overview-estate-dialog/overview-estate-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationDialogComponent } from './home/registration-dialog/registration-dialog.component';
import { UserInfoComponent } from './admin/user-info/user-info.component';
import { EstateSearchPipe } from './pipe/estate-search.pipe';
import { PartOfCityPipe } from './pipe/part-of-city.pipe';

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
    AddEstateTypeDialogComponent,
    AddEquipmentDialogComponent,
    AddAccessoriesDialogComponent,
    AddHeatingDialogComponent,
    FooterComponent,
    RegistrationDialogComponent,
    LoginDialogComponent,
    OverviewEstateDialogComponent,
    EditEstateDialogComponent,
    EstatePageOverviewComponent,
    FilterPageComponent,
    AdvertisingRequestComponent,
    AdvertisingRequestOverviewComponent,
    AdvertisingDialogOverviewComponent,
    UserInfoComponent,
    EstateSearchPipe,
    PartOfCityPipe
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgxWatermarkModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CKEditorModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAz8PX_PdPZo7WmWuxLYVMDiJUOozl0Fn4",
      authDomain: "soy-smile-249718.firebaseapp.com",
      databaseURL: "https://soy-smile-249718.firebaseio.com",
      projectId: "soy-smile-249718",
      storageBucket: "soy-smile-249718.appspot.com",
      messagingSenderId: "870517553704",
      appId: "1:870517553704:web:d238ce266071d519f8131d",
      measurementId: "G-JGV7HTSL0B"
    }),
  ],
  providers: [HttpClientModule, NgxImageCompressService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [AddAccessoriesDialogComponent, AddEquipmentDialogComponent, AddHeatingDialogComponent, AddCityDialogComponent, AddEstateTypeDialogComponent, AddEstateCategoryDialogComponent, AddEstateSubCategoryDialogComponent,
    AddPartOfCityDialogComponent,UserInfoComponent,AdvertisingDialogOverviewComponent,AdvertisingRequestOverviewComponent,
    AddEstateDialogComponent, OverviewEstateDialogComponent, EditEstateDialogComponent, LoginDialogComponent, OptionComponent, RegistrationDialogComponent, EstateOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }