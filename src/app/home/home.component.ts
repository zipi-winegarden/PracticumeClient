import { Component } from '@angular/core';
import { AllEmployeeComponent } from "../employeeComponent/all-employee/all-employee.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [AllEmployeeComponent]
})
export class HomeComponent {

}
