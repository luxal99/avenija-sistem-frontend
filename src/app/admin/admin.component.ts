import { ViewChild } from '@angular/core';
import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  

  @ViewChild('target', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;

  constructor(private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
  }

 ngAfterViewInit(): void {
   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
   //Add 'implements AfterViewInit' to the class.
   this.loadAdvertisingRequestOverview()
 }


  async loadAdvertisingRequestOverview (){
    this.entry.clear();
    const { AdvertisingRequestOverviewComponent } = await import('./advertising-request-overview/advertising-request-overview.component');
    const factory = this.resolver.resolveComponentFactory(AdvertisingRequestOverviewComponent)
    this.entry.createComponent(factory);
  }
  async loadEstateOverview (){
    this.entry.clear();
    const { EstateOverviewComponent } = await import('./estate-overview/estate-overview.component');
    const factory = this.resolver.resolveComponentFactory(EstateOverviewComponent)
    this.entry.createComponent(factory);
  }


  async loadOption (){
    this.entry.clear();
    const { OptionComponent } = await import('./option/option.component');
    const factory = this.resolver.resolveComponentFactory(OptionComponent)
    this.entry.createComponent(factory);
  }
}
