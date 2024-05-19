import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './employeeComponent/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './employeeComponent/add-employee/add-employee.component';
import { AllEmployeeComponent } from './employeeComponent/all-employee/all-employee.component';
import { DeleteEmployeeComponent } from './employeeComponent/delete-employee/delete-employee.component';


const routes: Routes = [
  { path: '', redirectTo: 'all-employee', pathMatch: 'full' },
  { path: 'all-employee', component: AllEmployeeComponent },
//   { path: 'add-employee', component: AddEmployeeComponent ,canActivate:[AuthGuard]},
  { path: 'add-employee', component: AddEmployeeComponent },

//   { path: 'edit-employee/:id', component: EditEmployeeComponent ,canActivate:[AuthGuard] }
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'delete-employee/:id', component: DeleteEmployeeComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeRoutes { }