import { Injectable } from '@angular/core';
import { ImageModel } from '../models/ImageModel';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends FactoryService<ImageModel> {
  route = "image"
}
