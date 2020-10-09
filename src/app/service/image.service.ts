import { Injectable } from '@angular/core';
import { Image } from '../models/Image';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends FactoryService<Image> {
  route = "image"
}
