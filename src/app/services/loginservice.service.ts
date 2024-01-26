import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Login } from '../model/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  url:string="http://localhost:3000/logininfo";

  constructor(private http:HttpClient) { }

  searchLogin(email:string){
    return this.http.get<Login>(`${this.url}?email=${email}`);

  }
}
