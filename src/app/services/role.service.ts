import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http:HttpClient) { }

getRoleList():Observable<Role[]>{
  return this._http.get<Role[]>('https://localhost:7279/api/Role')
}
}

