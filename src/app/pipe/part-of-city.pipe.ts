import { Pipe, PipeTransform } from '@angular/core';

import { PartOfCity } from '../models/PartOfCity';

@Pipe({
  name: 'partOfCity'
})
export class PartOfCityPipe implements PipeTransform {

  transform(listOfPartOfCities:Array<PartOfCity>, searchText:string): any {
    if (!listOfPartOfCities) return [];
    if (!searchText) return listOfPartOfCities

    return listOfPartOfCities.filter(item=>item.title.toLowerCase().startsWith(searchText.toLowerCase()))
  }

}
