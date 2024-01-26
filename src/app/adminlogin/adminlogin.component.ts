import { Component } from '@angular/core';
import { Login } from '../model/loginModel';
import{Router,ActivatedRoute} from '@angular/router'
import { LoginserviceService } from '../services/loginservice.service';




@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

constructor(private loginservice:LoginserviceService,private router:Router ){}

  onLogin(data:any){
    let searchemail : Login ={
    email :"",
    password: ""
    };
    this.loginservice.searchLogin(data.email).subscribe(res =>{

      searchemail = res;
    })
    console.log(searchemail);
    if(data.email=="demo123@gmail.com"){
      this.router.navigate(['/books'])
    }else{
      alert("Please try again")
    }
  }

}
