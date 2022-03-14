import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/persona.model';

@Injectable({
  providedIn: 'root'
})
export class GarantesService {
  array = [
    {  fechas: '2010-12-12',
    },
    {
       fechas: '2013-06-25',
     },
    {
       fechas: '2009-08-06',
    },
];
  garante: Persona[];
  readonly APIurl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  getGarantes(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/garante?format=json', { headers: this.httpHeaders });
  }

  addGarante(val: any) {
    console.log(val);
    return this.http.post(this.APIurl + '/garante', val);
  }

  getGarante(garanteId): Observable<any> {
    return this.http.get(this.APIurl + '/garante/' + garanteId, { headers: this.httpHeaders });
  }

  guardarDatos(){
    this.getGarantes().subscribe(data => {
      this.garante = data;
    });
    return this.garante;
  }
  getGaranteUs(id: number){
    this.garante = this.guardarDatos();
    return this.guardarDatos().find(item => { return item.usuario === id})
  }

  deleteGarante(garanteId){
    return this.http.delete(this.APIurl + '/garante/' + garanteId, { headers: this.httpHeaders }).toPromise()
    .then(() => {
      this.getGarantes();
    });
  }
  updateGarantes(garante: Persona): Observable<any> {
    return this.http.put(this.APIurl + '/garante/' + garante.id, garante);
  }
}

