import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  readonly APIUrl = environment.SERVER_URL;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }


    // Ticket Part

  getTicketList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'ticket')
  }

  addTicket(value: any): Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl + 'ticket/create', value)
  }

  retriveTicket(id: any): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'ticket/'+id)
  }

  updateTicket(id: any, value: any): Observable<any[]>{
    return this.http.patch<any[]>(this.APIUrl + 'ticket/'+id, value)
  }

  deleteTicket(id: any): Observable<any[]>{
    return this.http.delete<any[]>(this.APIUrl + 'ticket/'+id)
  }




  // LOGIN PART

  proceedLogin(UserCred: any) {
    return this.http.post(this.APIUrl + 'auth/token/login/', UserCred)
  }

  getLoginUser(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'auth/users/me/')
  }

  getEmployee(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'emp/' + id + '/')
  }

  IsLogedIn() {
    return localStorage.getItem('token') != null;
  }

  GetToken() {
    return localStorage.getItem('token') || '';
  }

  HaveAccess() {
    if (localStorage.getItem('role') === 'Admin') {
      return true
    }
    else {
      return false
    }
  }


}
