import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Equipo } from '../models/euipo.model';

@Injectable({
  providedIn: 'root',
})


export class EquioposService {

 


  private  endpoint = (`${environment.BaseURL}/equipos`);


  constructor(private http: HttpClient) {}

  

  getAll(): Observable<Equipo[]> {

    return this.http.get<Equipo[]>(`${this.endpoint}/listar/0/100`);
  }

  createEquipo( Equipo: Equipo):Observable<Equipo>{    
  
    return this.http.post<Equipo>(`${this.endpoint}/crear`, 
        Equipo,
     
    )
  }

  deleteEquipo(id: number): Observable<any>{
    return this.http.delete(`${this.endpoint}/eliminar/${id}`)
  }
  
  getEquipo(id:number){
    return this.http.get(`${this.endpoint}/consultar/${id}`)
  }

  updateEquipo(id:number, Equipo:Equipo){

  
    return this.http.put(`${this.endpoint}/actualizar/${id}`,
      Equipo,
     
    )
  }

  getByDate(fechaInicial: string, fechaFinal: string){
      return this.http.get(`${this.endpoint}/consultar/${fechaInicial}/${fechaFinal}`);
  }

}
