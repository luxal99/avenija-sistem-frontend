import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdvertisingRequestComponent } from './advertising-request/advertising-request.component';
import { ClientComponent } from './client/client.component';
import { EstatePageOverviewComponent } from './estate-page-overview/estate-page-overview.component';
import { FilterPageComponent } from './filter-page/filter-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './service/auth.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent,canActivate: [AuthService]  },
  { path: 'contact', component: FooterComponent },
  { path: 'estate/:id', component: EstatePageOverviewComponent },
  { path: 'filter', component: FilterPageComponent },
  { path: 'client', component: ClientComponent },
  {path:'advertising',component:AdvertisingRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
