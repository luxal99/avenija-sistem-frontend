import {Injectable} from '@angular/core';
import {ImageModel} from '../models/ImageModel';
import {FactoryService} from './factory.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends FactoryService<ImageModel> {
  route = "image"

  save(entity: any): Observable<ImageModel> {
    return this.http.post<ImageModel>(`/${this.route}`, entity, {responseType: 'json'})
  }
}
