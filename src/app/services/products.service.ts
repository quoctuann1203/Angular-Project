import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductDescription } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  items = new BehaviorSubject<any>([]);

  getItems(): any {
    let data;
    this.http
      .get('http://localhost:8000/api/products/')
      .subscribe((res: any) => {
        this.items.next(res.data);
        data = res.data;
      });
    return data;
  }

  insertItem(item: ProductDescription): Observable<ProductDescription> {
    const headers = { 'content-type': 'application/json' };
    //	console.log(JSON.stringify(item))
    return this.http.post<ProductDescription>(
      'http://localhost:8000/api/insert/',
      item,
      { headers: headers }
    );
  }

  editItem(id: any, item: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.put<any>(`http://localhost:8000/api/update/${id}`, item, {
      headers: headers,
    });
  }

  deleteItem(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.delete<any>(`http://localhost:8000/api/delete/${id}`, {
      headers: headers,
    });
  }
}
