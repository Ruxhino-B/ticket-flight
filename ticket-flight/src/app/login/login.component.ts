import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: SharedServiceService, private route: Router) {
    localStorage.clear();
  }

  responsedata: any;
  user: any;
  employee: any;

  errorSrv: any = null;

  hide = true;

  Login = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ProceedLogin() {
    if (this.Login.valid) {
      this.service.proceedLogin(this.Login.value).subscribe(result => {       
       
          this.responsedata = result;
       
      }, 
      err =>{
        this.errorSrv = err.message,
        console.log()
      },

      ()=>{
          localStorage.setItem('token', this.responsedata.auth_token)
          this.getRole();
        }
        );
    }
  }


  getRole() {
    this.service.getLoginUser().subscribe(res => {
      this.user = res;
      // console.log(this.user);
      this.service.getEmployee(this.user.id).subscribe(rez => {
        this.employee = rez;
        localStorage.setItem('role', this.employee.role);
        localStorage.setItem('emp_id', this.employee.id);
        localStorage.setItem('user', this.user.username);
        localStorage.setItem('id', this.user.id);
        localStorage.setItem('photo', this.employee.photo);
        localStorage.setItem('email', this.user.email);
        if (this.employee.role === 'Admin') {
          this.route.navigate(['dashboard']);
        } else {
          this.route.navigate(['']);
        }
        
      })

    })
  }



}
