import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgFor,JsonPipe],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
) {}
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.deleteEmployee(id);
  }
  
 deleteEmployee(id:number) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Employee deleted successfully!',
            showConfirmButton: false,
            timer: 1500 // סגירת ההתראה אוטומטית אחרי 1.5 שניות
          }).then(() => {
            this.router.navigate(['employee/all-employee']);
          });
           
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error updating employee details!',
            showConfirmButton: false,
            timer: 1500 // סגירת ההתראה אוטומטית אחרי 1.5 שניות
          })
        }
      );
    }
}
