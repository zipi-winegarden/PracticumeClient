import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
   { path: 'employee', loadChildren: () => import('./employee.routes').then(m => m.EmployeeRoutes) },
   // { path: 'login', component: LoginComponent },
   // { path: 'logout', component: LogoutComponent },
   { path: '**', component: NotFoundComponent },
];
