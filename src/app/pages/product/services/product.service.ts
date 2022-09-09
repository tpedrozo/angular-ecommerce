import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { DatePipe } from '@angular/common'; 
import { ProductFilter } from '../filter/product.filter'; 
import { GenericResult, GenericSimpleResult } from "src/app/shared/models/generic-result.model";
import { AppConfig } from "src/app/app.config";
import { Product } from "../models/product.model";
@Injectable({ providedIn: 'root'}) 
export class ProductService { 
  constructor( 
    private http: HttpClient, 
    private config: AppConfig, 
    private datePipe: DatePipe) { 
  } 
  get(filter: ProductFilter | null): Observable<GenericResult<Product[]>> {
    const url = this.config.baseUrl + 'Product?'; 
    console.log(url)
    let httpParams = new HttpParams(); 
    let nFilter = filter as Object;
    if(nFilter) {
      Object.keys(nFilter).forEach((key: any) => {
        if(Object(nFilter)[key]) {
          if (Object(nFilter)[key] instanceof Date) {
            httpParams = httpParams.set(key, this.datePipe.transform(Object(nFilter)[key],'yyyy-MM-ddTHH:mm:ss.SSS') as string);
          } else {
            httpParams = httpParams.set(key, Object(nFilter)[key]);
          }
        }
      });
    }
    return this.http.get<GenericResult<Product[]>>(url, {params: httpParams}); 
  }
  getById(id: number): Observable<GenericResult<Product>> { 
    const url = this.config.baseUrl + 'Product/' + id; 
    return this.http.get<GenericResult<Product>>(url); 
  } 
  put(model: Product): Observable<GenericSimpleResult> { 
    const url = this.config.baseUrl + 'Product'; 
    return this.http.put<GenericSimpleResult>(url, model); 
  } 
  post(model: Product): Observable<GenericSimpleResult> { 
    const url = this.config.baseUrl + 'Product'; 
    return this.http.post<GenericSimpleResult>(url, model); 
  } 
  delete(id: number): Observable<GenericSimpleResult> { 
    const url = this.config.baseUrl + 'Product'; 
    return this.http.delete<GenericSimpleResult>(url); 
  } 
} 