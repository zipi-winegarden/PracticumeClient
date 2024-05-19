import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
@Component({
  selector: 'app-all-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgFor,JsonPipe,NgbModule],
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
})
export class AllEmployeeComponent {
  public employeeList: Employee[] = [];
  public filteredEmployeeList: Employee[] = [];

  constructor(private _employeeService: EmployeeService, private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this._employeeService.getEmployeelist().subscribe({
      next: (res: Employee[]) => {
        this.employeeList = res.filter(employee => employee.isActive === true);
        this.filteredEmployeeList = this.employeeList.slice();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  delete(id: number) {
    this.router.navigate(['employee/delete-employee', id]);
  }

  // Function to filter the employee list based on search input
  filterEmployees(event: any): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployeeList = this.employeeList.filter(employee =>
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.idNumber.toLowerCase().includes(searchTerm) ||
      (employee.entryWorkDate instanceof Date && employee.entryWorkDate.toISOString().toLowerCase().includes(searchTerm))
    );
  }

  // Function to export the employee list to an Excel file
  exportToExcel(): void {
    const dataForExport = this.employeeList.map(({ employeeRoles, ...rest }) => rest); // Exclude the 'role' field
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName: string = 'employee_list.xlsx';
    XLSX.writeFile(workbook, fileName);
  }
  openEditEmployeeModal(id: number) {
    // פתיחת חלון מודל והעברת ה־ID
    const modalRef = this.modalService.open(EditEmployeeComponent, { centered: true });
    modalRef.componentInstance.employeeId = id; // העברת ה־ID לקומפוננטת העריכה
  }
  openAddEmployeeModal() {
    // פתיחת חלון מודל והעברת ה־ID
    const modalRef = this.modalService.open(AddEmployeeComponent, { centered: true });
    // modalRef.componentInstance.employeeId = id; // העברת ה־ID לקומפוננטת העריכה
  }
}
