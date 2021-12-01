import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductDescription } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getItems():Observable <Product[]>{
    return this.http.get<Product[]>('http://localhost:8000/api/products/');
    }

    insertItem(item:ProductDescription): Observable<ProductDescription> {
      const headers = { 'content-type': 'application/json'}
      //	console.log(JSON.stringify(item))
      return this.http.post<ProductDescription>('http://localhost:8000/api/insert/', item, {'headers':headers});
    }

    editItem(id : any, item:any) : Observable<any> {
      const headers = { 'content-type': 'application/json'}
      return this.http.put<any>(`http://localhost:8000/api/update/${id}`, item, {'headers':headers});
    }

    deleteItem(id: any) : Observable<any> {
      const headers = { 'content-type': 'application/json'}
      return this.http.delete<any>(`http://localhost:8000/api/delete/${id}`, {'headers':headers});
    }
}
