import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
getEmployeelist():Observable<Employee[]>{
  return this._http.get<Employee[]>('https://localhost:7279/api/Employees')
}
getEmployeetById(id: number): Observable<Employee> {
  return this._http.get<Employee>(`https://localhost:7279/api/Employees/${id}`)
}
addEmployee(employee: Employee) {
  return this._http.post('https://localhost:7279/api/Employees', employee)
}
deleteEmployee(id: number) {
  return this._http.delete(`https://localhost:7279/api/Employees/${id}`)
}
updateEmployee(id: number,employee:Employee){
  return this._http.put<Employee>(`https://localhost:7279/api/Employees/${id}`,employee)
}
}
