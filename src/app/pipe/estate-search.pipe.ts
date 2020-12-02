import { Pipe, PipeTransform } from '@angular/core';

import { Estate } from '../models/Estate';

@Pipe({
  name: 'estateSearch'
})
export class EstateSearchPipe implements PipeTransform {

  transform(listOfEstates: Array<Estate>, searchText: string): any {
    if (!listOfEstates) return [];
    if (!searchText) return listOfEstates
    return listOfEstates.filter(x => x.title.toLowerCase().includes(searchText.toLowerCase()));

  }

}
