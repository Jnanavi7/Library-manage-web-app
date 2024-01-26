import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators';
import { Book } from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  baseUrl = "http://localhost:3000/books";

  constructor(private http: HttpClient) { }

  getbooks() {
    return this.http.get<Book[]>(this.baseUrl).pipe(map((res: any) => {
      return res;
    }))
  }

  postbooks(data: any) {
    return this.http.post<Book>(this.baseUrl, data).pipe(map((res: any) => {
      return res;
    }))
  }

  deletebooks(id: number) {
    return this.http.delete<Book>(this.baseUrl + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updatebooks(data: any, id: number){

    return this.http.put<Book>(this.baseUrl + '/' + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  searchBooks(author:string){
    return this.http.get<Book[]>(`${this.baseUrl}?author=${author}`);
  }

}



