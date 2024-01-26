import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

import { map } from 'rxjs/operators';
import { Student } from '../model/studmodel';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {


  baseUrl ="http://localhost:3000/studentsinfo";

  constructor(private http:HttpClient) { }

  getstudents() {
    return this.http.get<Student[]>(this.baseUrl).pipe(map((res: any) => {
      return res;
    }))
  }

  poststudents(data: any) {
    console.log(data);
    return this.http.post<Student>(this.baseUrl, data).pipe(map((res: any) => {
      return res;   
    }))
  }

  deletestudents(id: number) {
    return this.http.delete<Student>(this.baseUrl + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updatestudents(data: any, id: number){
    return this.http.put<Student>(this.baseUrl + '/' + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  searchstudents(name:string){
    return this.http.get<Student[]>(`${this.baseUrl}?name=${name}`); 
  }
 
}
