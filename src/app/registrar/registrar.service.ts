import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../persona.model';
@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  readonly APIurl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }  
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  addRegistro(val: any) {
    console.log(val);
    return this.http.post(this.APIurl + '/login', val);
  }
}
