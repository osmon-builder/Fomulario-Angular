import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  private  endpoint = (`${environment.BaseURL}`);

  constructor(private http: HttpClient) {}


  login(username: string, password: string){
    return this.http.post<User>(`${this.endpoint}/login`, { username, password });
  }

  logout(): Observable<User[]> {

    return this.http.get<User[]>(`${this.endpoint}/logout`);
  }


}
