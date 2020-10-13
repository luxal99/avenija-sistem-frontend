import { PartOfCity } from './PartOfCity';

export class City {
 id:number;
 title:string 
 listOfPartOfCities:PartOfCity[]

 constructor(title?){
     this.title = title;
 }
}