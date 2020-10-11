import { Component, OnInit } from '@angular/core';
import { Estate } from '../models/Estate';
import { Filter } from '../models/Filter';
import { EstateService } from '../service/estate.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {


  listOfEstates: Array<Estate> = [];
  filteredEstate: Array<Estate> = []
  constructor(private estateService: EstateService) { }

  ngOnInit() {
    this.getAllEstates();
    this.filterEstate();
  }

  filterEstate() {



  }

  getAllEstates() {
    this.estateService.getAll().subscribe(resp => {
      this.listOfEstates = resp as Array<Estate>
      var filter: Filter = JSON.parse(localStorage.getItem("filter"))
      if (JSON.stringify(filter.id_city).length === 2) {

        this.filteredEstate = this.listOfEstates.filter(x => x.id_transaction_type.id === filter.id_transaction_type.id)
      } else {
        this.filteredEstate = this.listOfEstates.filter(x =>
          x.id_location.id_part_of_city.id_city.id === filter.id_city.id &&
          x.id_transaction_type.id === filter.id_transaction_type.id &&
          x.id_estate_sub_category.id === filter.id_estate_sub_category.id
        )
      }
    })


  }
}
