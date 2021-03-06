import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoryService<T> {

  protected route: string;

  constructor(protected http: HttpClient) { }

  save(entity: T):Observable<T> {
      return this.http.post<T>(`/${this.route}`, entity, { responseType: 'json' });
  }

  delete(id: number) {
    return this.http.delete(`/${this.route}/` + id, { responseType: 'text' })
  }

  findById(id):Observable<T> {
    return this.http.get<T>(`/${this.route}/` + id, { responseType: 'json' })
  }

  update(entity: T) {
    return this.http.put(`/${this.route}`, entity, { responseType: 'text' })
  }

  getAll() {
    return this.http.get(`/${this.route}`, { responseType: 'json' });
  }
}
