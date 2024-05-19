import { Component } from '@angular/core';
import { startBeforeEntryWorkDateOnChangeValidator, startBeforeEntryWorkDateValidator } from '../../validators/entryWorkDateValidator';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeRole } from '../../models/employee-role.model';
import { Role } from '../../models/role.model';
import { onlyLettersValidator } from '../../validators/onlyLettersValidator';
import { birthDateValidator } from '../../validators/dateBeforeToday';
import { RoleService } from '../../services/role.service';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,NgFor,JsonPipe],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  employee: Employee = new Employee();
  roleList: Role[] = [];
  availableRoles: Role[] = [];
  currentRoles: Role[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal) {
    this.employeeForm = this.formBuilder.group({
      id: [],
      idNumber: ['', [Validators.required,Validators.pattern('^[0-9]{9}')]],
      firstName: ['',[ Validators.required,onlyLettersValidator]],
      lastName: ['', [Validators.required,onlyLettersValidator]],
      gender: ['', Validators.required],
      entryWorkDate: ['', Validators.required],
      birthDate: ['',[Validators.required,birthDateValidator()]],
      employeeRoles: this.formBuilder.array([]),
    });
  }


  ngOnInit(): void {
  
    this.getRoleList();

  }
  createRoleFormGroup(role: EmployeeRole): FormGroup {
    return this.formBuilder.group({
      roleId: [role.roleID, Validators.required],
      isAdministrative: [role.isAdministrative, Validators.required],
      startDate: [this.formatDate(role.startDate),[Validators.required,startBeforeEntryWorkDateValidator,startBeforeEntryWorkDateOnChangeValidator] ],
    });
  }
  getRoleList() {
    this.roleService.getRoleList().subscribe(
      (data: Role[]) => {
        this.roleList = data;
        this.filterAvailableRoles(); 
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  filterAvailableRoles() {
 
    const usedRoleIds = this.currentRoles.map(role => role.id);

    this.availableRoles = this.roleList.filter(role => !usedRoleIds.includes(role.id));
    console.log(this.availableRoles)
  }
  isCurrentRole(index: number): boolean {
    return this.currentRoles[index] != null;
  }
  addEmployeeRole() {
   
    const control = this.employeeForm.get('employeeRoles') as FormArray;
      const newRole = new EmployeeRole();
      control.push(this.createRoleFormGroup(newRole));
    } 
  removeEmployeeRole(index: number) {
    const control = this.employeeForm.get('employeeRoles') as FormArray;
    const removedRole = this.currentRoles[index];
    control.removeAt(index);
  
    // Remove the role from the currentRoles array
    this.currentRoles.splice(index, 1);
  
    // Add the removed role back to the availableRoles list
    if (removedRole) {
      this.availableRoles.push(removedRole);
    }
    
  
    // Filter the available roles again
    this.filterAvailableRoles();
    Swal.fire({
      icon: 'success',
      title: 'Employeews Role deleted successfully!',
      showConfirmButton: false,
      timer: 1500 // סגירת ההתראה אוטומטית אחרי 1.5 שניות
    })
  }
  
  saveEmployee() {
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee( updatedEmployee).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Employee added successfully!',
            showConfirmButton: false,
            timer: 1500 // סגירת ההתראה אוטומטית אחרי 1.5 שניות
          }).then(() => {
            this.closeModal(); // סגירת החלון המודל
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error adding employee details!',
            showConfirmButton: false,
            timer: 1500 // סגירת ההתראה אוטומטית אחרי 1.5 שניות
          })
        }
      );
    }
  }
  closeModal() {
 
    this.activeModal.close();
  }
  cancelEdit() {
    this.activeModal.close()

  }


  formatDate(date: any): string {
    if (date) {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
      const day = ('0' + newDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    return '';
  }
 


 



 

  get EmployeeRolesArray() {
    return this.employeeForm.get('employeeRoles') as FormArray;
  }







isLastRoleEmpty(){
  const control = this.employeeForm.get('employeeRoles') as FormArray;
  const lastRoleFormGroup = control.at(control.length - 1) as FormGroup | null;

  if (lastRoleFormGroup && lastRoleFormGroup.get('roleId') && !lastRoleFormGroup.get('roleId')?.value) {
    
    return true;
  }
  else{
    return false;
  }
}

  
 



 
  
  onRoleChange(index: number, event: Event) {
    console.log("Enter Change Function")
    const target = event.target as HTMLSelectElement;
    const roleId = target.value ? parseInt(target.value, 10) : null;

    if (roleId !== null) {
      const control = this.employeeForm.get('employeeRoles') as FormArray;
      const roleFormGroup = control.at(index) as FormGroup | null;

      if (roleFormGroup && roleFormGroup.get('roleId')) {
        roleFormGroup.get('roleId')?.setValue(roleId);

        // Update the currentRoles array
        const selectedRole = this.roleList.find(role => role.id === roleId);
        if (selectedRole) {
          this.currentRoles[index] = selectedRole;
        }

        // Update the selected field to the currently chosen role
        this.filterAvailableRoles();
      }
    }
  }
  validateStartDates(event: Event) {
    const entryWorkDateValue = (event.target as HTMLInputElement).value;
  
    const rolesArray = this.employeeForm.get('employeeRoles') as FormArray;
    rolesArray.controls.forEach(roleControl => {
      const startDateControl = roleControl.get('startDate');
      if (startDateControl) {
        const startDateValue = startDateControl.value;
        const validationError = startBeforeEntryWorkDateOnChangeValidator(startDateValue, entryWorkDateValue);
        if (validationError) {
          startDateControl.setErrors(validationError);
        } else {
          startDateControl.setErrors(null);
        }
      }
    });
  }
  
}
