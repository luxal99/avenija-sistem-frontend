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

  async loadEstateOverview (){
    this.entry.clear();
    const { EstateOverviewComponent } = await import('./estate-overview/estate-overview.component');
    const factory = this.resolver.resolveComponentFactory(EstateOverviewComponent)
    this.entry.createComponent(factory);
  }
}
